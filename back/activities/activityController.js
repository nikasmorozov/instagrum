const Activity = require('../activities/activityModel.js');


const createActivity = (userFrom, activityTitle, userTo, postID) => {
    let activity = new Activity();

    activity.user1 = userFrom;
    activity.title = activityTitle;
    activity.user2 = userTo;
    activity.post = postID;

    activity.save()
};


module.exports = {
    createActivity
};
