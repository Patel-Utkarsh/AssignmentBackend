const userModel = require("../models/userModel");

exports.connectionStatus = async (req,res) => {
    const {profile_id} = req.body; 
    const {user_id} = req;


    try {
        const user = await userModel.findById(profile_id);
        const validConnection = user.friends.includes(user_id);
        if(validConnection) {
            res.status(200).json({
                friend : true,
                message : 'already a friend'
            })
        }
        else if (user.pending_friend_requests.includes(user_id)) {
            res.status(200).json({
                friend : false,
                requestPending : true,
                message : 'friend request pending'
            })

        }



        else {
            res.status(200).json({
                friend : false,
                message : 'Not a friend'
            })

        }

        
    } catch (error) {

        res.status(500).json({
            friend : false,
            message : error
        })
        
    }

}

exports.sendConnection = async(req,res) => {
    const {profile_id} = req.body;
    const {user_id} = req;

    try {
        await userModel.findByIdAndUpdate(profile_id,{$push : {pending_friend_requests : user_id}});
        res.status(200).json({
            success: true,
            message : 'friend request sent successfully'
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error
        })

        
    }
}


exports.addConnection = async(req,res) => {
    const {profile_id} = req.body;
    const {user_id} = req;

    try {
        let user = await userModel.findByIdAndUpdate(user_id,{$pull : {pending_friend_requests : profile_id}});
        user.friends.push(profile_id);
        await user.save();
        await userModel.findByIdAndUpdate(profile_id,{$push : {friends : user_id}});
        res.status(200).json({
            success: true,
            message : 'added friend successfully'
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error
        })

        
    }
}

exports.removeRequest = async(req,res) => {
    const {profile_id} = req.body;
    const {user_id} = req;

    try {
        await userModel.findByIdAndUpdate(user_id,{$pull : {pending_friend_requests : profile_id}});
        res.status(200).json({
            success: true,
            message : 'rejected request successfully'
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error
        })
        
    }

}