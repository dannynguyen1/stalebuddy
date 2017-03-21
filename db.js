var MongoClient = require('mongodb').MongoClient;

var RecipeModel = require("./RecipeModel"),
    IngredientModel = require("./IngredientModel");

var dbURI = 'mongodb://localhost:27017';

function* connect() {
    if (!module.exports.db) {
        module.exports.db = yield((cb)=>{
            MongoClient.connect(dbURI, (err, res) => {
                cb(null, res);
            })
        });

        module.exports.Recipes = module.exports.db.collection(RecipeModel.name);
        module.exports.Recipe = RecipeModel.constructor;
        module.exports.Ingredients = module.exports.db.collection(IngredientModel.name);
        module.exports.Ingredient = IngredientModel.constructor;
    }
}

function* disconnect() {
    module.exports.Recipes = null;
    module.exports.Ingredients = null;
    module.exports.db = yield [gracefulShutdown, function(){}];
}

// Close current mongoose connection then output to console
function gracefulShutdown(msg, callback) {
    module.exports.db.close(() => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

/*
 This following three method is use to listen for three scenario listed below.
 It will gracefully closes the Mongoose connection before it actually ends.
*/
// Listen for SIGUSR2, which is what nodemon uses
// once() is attached for one time listener vs on()
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Listen for SIGINT emitted on application termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

// Listen for SIGTERM emitted
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});

module.exports = {
    connect: connect,
    disconnect: disconnect
};