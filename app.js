const express = require('express');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const keys = require('./config/keys');
const analyticsRoutes = require('./routes/analitycs');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const app = express();

mongoose.connect('mongodb://andrey:123456asd@ds247347.mlab.com:47347/crmangular')
	.then(() => console.log('MongoDB connected!'))
	.catch(error => console.log(error))
app.use(passport.initialize());
require('./middleware/passport')(passport)
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/dist/client'))
    app.get('*', (req, res) => {
       res.sendFile(
       	path.resolve(
       		__dirname, 'client','dist','client','index.html'
		)
	   )
	})
}

module.exports = app;