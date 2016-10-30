/** Config */
var dotenv = require("dotenv");
dotenv.load();

module.exports = {
    FB_PAGE_TOKEN:    process.env.FB_PAGE_TOKEN,
    FB_PAGE_ID:       process.env.FB_PAGE_ID,
    FB_APP_SECRET:    process.env.FB_APP_SECRET,
    FB_VERIFY_TOKEN:  process.env.FB_VERIFY_TOKEN,
    WIT_TOKEN:        process.env.WIT_TOKEN ,
    PORT:             process.env.PORT,
    LUP_API_TOKEN:    process.env.LUP_API_TOKEN,
    LUP_API_ENDPOINT: process.env.LUP_API_ENDPOINT
};
