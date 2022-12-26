
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/reports": {
        "post": {
          "operationId": "ReportsController_createReport",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateReportDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "was created succefully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MongoReport"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "500": {
              "description": "Internal Server Error"
            }
          },
          "tags": [
            "REPORT"
          ]
        },
        "get": {
          "operationId": "ReportsController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "was searched succefully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MongoReport"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "403": {
              "description": "Report Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          },
          "tags": [
            "REPORT"
          ]
        }
      },
      "/reports/{idsearch}": {
        "get": {
          "operationId": "ReportsController_findOne",
          "parameters": [
            {
              "name": "idsearch",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "was searched succefully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MongoReport"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request"
            },
            "403": {
              "description": "Report Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          },
          "tags": [
            "REPORT"
          ]
        },
        "patch": {
          "operationId": "ReportsController_updateReport",
          "parameters": [
            {
              "name": "idsearch",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateReportDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "was updated succefully"
            },
            "400": {
              "description": "Bad Request"
            },
            "403": {
              "description": "Report Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          },
          "tags": [
            "REPORT"
          ]
        },
        "delete": {
          "operationId": "ReportsController_removeReport",
          "parameters": [
            {
              "name": "idsearch",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "was delated succefully"
            },
            "400": {
              "description": "Bad Request"
            },
            "403": {
              "description": "Report Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          },
          "tags": [
            "REPORT"
          ]
        }
      }
    },
    "info": {
      "title": "Edb Group",
      "description": "Test EndPoints",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "CreateReportDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "content": {
              "type": "string"
            }
          },
          "required": [
            "title",
            "description",
            "price",
            "content"
          ]
        },
        "MongoReport": {
          "type": "object",
          "properties": {
            "price": {
              "type": "number",
              "example": "200",
              "description": "Report Price"
            },
            "title": {
              "type": "string",
              "example": "New Report Test",
              "description": "Report Title"
            },
            "description": {
              "type": "string",
              "example": "Laboris enim et ea nulla anim nisi Lorem.",
              "description": "Report Description"
            },
            "content": {
              "type": "string",
              "example": "In do consequat nulla aliqua excepteur deserunt amet sint ea magna eu in eu.",
              "description": "Report Content"
            }
          },
          "required": [
            "price",
            "title",
            "description",
            "content"
          ]
        },
        "UpdateReportDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "content": {
              "type": "string"
            },
            "price": {
              "type": "number"
            }
          },
          "required": [
            "title",
            "description",
            "content",
            "price"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
