export default function (router) {

	/* Middleware */

	router.use((req, res, next) => {
	    next();
	});

	/* Routes */

	router.get('/', (req, res) => {
  		res.json({msg: 'Hello World!'})
	})

}