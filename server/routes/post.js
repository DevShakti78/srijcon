const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const Post = mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,power,pic,battlecount,height,weight} = req.body 
    if(!title || !power || !pic || !battlecount || !height || !weight){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
req.user.password = undefined;

    const post = new Post({
        title,
        power,
        battlecount,
        height,
        weight,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

// router.get('/mypost',(req,res)=>{
//     Post.find({postedBy:req.user._id})
//     .populate("PostedBy","_id name")
//     .then(mypost=>{
//         res.json({mypost})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })



// router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
//     Post.findOne({_id:req.params.postId})
//     .populate("postedBy","_id")
//     .exec((err,post)=>{
//         if(err || !post){
//             return res.status(422).json({error:err})
//         }
//         if(post.postedBy._id.toString() === req.user._id.toString()){
//               post.remove()
//               .then(result=>{
//                   res.json(result)
//               }).catch(err=>{
//                   console.log(err)
//               })
//         }
//     })
// })

module.exports = router;