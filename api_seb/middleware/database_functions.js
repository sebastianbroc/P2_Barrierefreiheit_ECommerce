const db = require('../lib/db.js');

module.exports = {
    databaseGet : ((table, where_column, where_value, callback) => {
        let dbquery = 'SELECT * FROM `' + table +  '` WHERE `' + where_column + '` = "' + where_value + '";'
        db.query(
            dbquery,
            (error, result) => {
                if(!error){
                    return callback(null, result);
                } else {
                    console.log(error);
                }
            }
        )
    }),
    databaseGetAndJoin : ((table, where_column, where_value, join_table, join_column_master, join_column_slave, callback) => {
        let dbquery = 'SELECT * FROM `' + table +  '` INNER JOIN `' + join_table + '` ON ' + join_column_master + ' = ' + join_column_slave + ' WHERE `' + where_column + '` = "' + where_value + '";'
        db.query(
            dbquery,
            (error, result) => {
                if(!error){
                    return callback(null, result);
                } else {
                    console.log(error);
                }
            }
        )
    })
}