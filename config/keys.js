const keys={
    mongoURI: "",
    client_id:"462437024563-h0blv5nqb36lmeqdr5711465t33glqs1.apps.googleusercontent.com",
    client_secret:"RrvkSLBM4NwL4geUQ1nguEdg"
}

if(process.env.NODE_ENV=='production')
{
    keys.mongoURI='mongodb://naveen19:naveen19@ds137404.mlab.com:37404/vidjot-prod'
}
else
{
    keys.mongoURI='mongodb://localhost/nodeWebApp';
}
module.exports=keys;