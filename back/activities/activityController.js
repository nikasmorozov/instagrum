const Activity = require('../activities/activityModel.js');


const createActivity = (username, userProfilePic, title, postID) => {
    let activity = new Activity();

    activity.username = username;
    activity.userProfilePic = userProfilePic;
    activity.title = title;
    activity.post = postID;

    activity.save()
};


const getActivities = async (req, res) => {
    try {
        let activity = await Activity.find({

        }).populate('post')

        res.json(activity)

    } catch (e) {
        res.status(400).json(e)
    }
};


module.exports = {
    createActivity,
    getActivities
};
