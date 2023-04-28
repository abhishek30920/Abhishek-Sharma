var express = require('express')
var router = express.Router()
const ads=require('../models/ads')
const company=require('../models/company')
// Search endpoint
router.get('/search', async (req, res) => {
    try {
      // Get the search keyword from the request parameter
      const query= req.query.q;
  let result=null
      // Perform the lookup between the ads and companies collections
    if(query){
     result = await ads.aggregate([
       
        {
          $lookup: {
            from: 'company',
            localField: 'companyId',
            foreignField: '_id',
            as: 'companys',
          },
        },
        { $unwind: '$companys' },
        {
            $match: {
              $or: [
             
                { primaryText: query   },
                { headline:  query  },
                { description:  query  },
                {'companys.name':query}
              
                
              ],
            },
          },
      
        {
          $project: {
            _id: 1,
            primaryText: 1,
            headline: 1,
            description: 1,
            CTA: 1,
            imageUrl: 1,
            name:'$companys.name',
            companyurl:'$companys.url'
          },
        },
      ])
    }else{
        result=await ads.aggregate([
            {
                $lookup: {
                  from: 'company',
                  localField: 'companyId',
                  foreignField: '_id',
                  as: 'companys',
                },
              },
              { $unwind: '$companys' },
             {$project: {  _id: 1,
            primaryText: 1,
            headline: 1,
            description: 1,
            CTA: 1,
            imageUrl: 1,
            companyId:1,
            name:'$companys.name',
            companyurl:'$companys.url'
    }}])
    }
   
  
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
module.exports=router