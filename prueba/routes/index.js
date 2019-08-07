import user from '../controllers/userController';
import credit from '../controllers/creditController'

export default (app) => {
	// users
    app.route('/users')
        .get(user.getAllUser)
       
    app.route('/users/create')
     	.post(user.createUser);

    app.route('/users/:userId')
        .get(user.getUser)
        .put(user.updateUser)
        .delete(user.deleteUser);

    app.route('/users/find/:identify')
    	.get(user.getUserByIdentify)

    // credits
     app.route('/credits/create')
     	.post(credit.createCredit);
};