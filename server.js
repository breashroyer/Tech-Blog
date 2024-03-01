const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection'); // Import the database connection configuration
const blogRoutes = require('./routes/blogRoutes');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const path = require('path'); // Import the path module
const routes = require('./routes'); // Import routes for dashboard, login, and registration pages

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 30 * 60 * 1000, // Sessions expire after 30 minutes of inactivity
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Use routes from blogRoutes
app.use('/', blogRoutes);

// Use routes for dashboard, login, and registration pages
app.use('/', routes);

// Example route to render the homepage (if not handled in blogRoutes)
app.get('/', (req, res) => {
  res.render('home');
});

// Listen on the configured port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

