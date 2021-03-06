module.exports = {

  name: "get_variant_options",

  title: "Get Variant Options",

  description: "",
  version: "v1",

  input:{
    title: "Get Variant Options",
    type: "object",
    properties: {
pid: {
        title: "product ID",
        type: "string",
        minLength: 1,
        description: "Enter the product ID"
      }
    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },

  mock_input:{},

  execute: function(input, output){
  var request = require("request");
 var x="https://api.bigcommerce.com/stores/"+input.auth.hash+"/v3/catalog/products/"+input.pid+"/options";
 var y= input.auth.cs;
  var z= input.auth.access_token;
    var options = {
      "method": "GET",
      "url": x,
      "headers": {
          "Accept": "application/json",
		  "Content-Type": "application/json",
         "X-Auth-Client": y,
		 "X-Auth-Token": z 
      }
	 
     }
	 
	 
	 request(options, function (error, response, body) {
  try {
            if (body && typeof(body) === "string") {
                body = JSON.parse(body);
            }
        } catch (e) {
            return output(body);
        };
		
		  if (response.statusCode === 403) {
            return output("the authentication information is incorrect.");
        }
		 if (response.statusCode === 400) {
            return output("there is an error in the construction of the request. The body of the response will contain more detail of the problem.");
        }
		if (response.statusCode === 404) {
            return output(" the requested record could not be found. This may also occur if the user does not have access to the requested record");
        }
        if (response.statusCode !== 200) {
            return output(body.status.errorDetails);
        }
		 if (response.statusCode === 200) {
            return output(null, {
				data: body
			});
          
        }
        output(body);
		
});
  }

}
