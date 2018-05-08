# URL Shortener

Demo [https://url--shortener.herokuapp.com/](https://url--shortener.herokuapp.com/)

Login/Password: test/test

Fullstack Javascript Web application.

## Back-end
* Express
* LokiJS
* Ava

### Getting started
Go to the `resources` folder and create an empty `db.local.json` file

### run dev server
```javascript
npm start
```

### run tests
```javascript
npm test
```

## Front-end
* React
* Redux
* Jest

### run dev server
```javascript
npm start
```


### run tests
```javascript
npm test
```

### build assets for production
```javascript
npm run build
```


## API reference

Allowed methods
`POST` | `GET` | `DELETE`

### Create link
```
POST /link
```

#### Parameters

Parameters should be passed as JSON in the body of the request.

**Required parameters**

parameter            | description
---------------------|-------------------------------
`linkURL` *string*   | The original URL to shorten

**cURL (example)**
```curl
curl -X POST \
  http://localhost:4200/link \
  -H 'Content-Type: application/json' \
  -d '{
	"linkURL": "http://www.google.com"
}'
```

**Response (example)**
```json
{
    "id": "zBnHa0",
    "visit": 0,
    "linkURL": "http://www.google.com",
    "meta": {
        "created": 1525783483887,
        "version": 0,
        "revision": 0
    }
}
```

**Error codes**

code            | description
----------------|----------------------------------------------------
`412`           | Precondition failed, the request body is not valid
`500`           | Internal error

### Get links
```
GET /link
```

Require authorization header with basic authentication

**cURL (example)**

```curl
curl -X GET \
  http://localhost:4200/link \
  -H 'Authorization: Basic dGVzdD====' \
  -H 'Content-Type: application/json' \
```

**Response (example)**
```json
{
[
    {
        "id": "xmRCyq",
        "visit": 1,
        "linkURL": "http://google.com",
        "meta": {
            "created": 1525778635631,
            "version": 0,
            "revision": 1,
            "updated": 1525778635631
        }
    },
    {
        "id": "W2gcva",
        "visit": 1,
        "linkURL": "http://github.com",
        "meta": {
            "created": 1525779142957,
            "version": 0,
            "revision": 1,
            "updated": 1525778635631
        }
    }
  ]
}
```

**Error codes**

code            | description
----------------|-----------------------------------------------
`401`           | Request had no/invalid Authorization header
`500`           | Internal error

### Get link
**cURL (example)**

```
GET /link/:identifier
```

**cURL (example)**
```curl
curl -X GET \
  http://localhost:4200/link/W2gcva \
  -H 'Content-Type: application/json' \
```

Redirect 301 to the original URL

**Error codes**

code            | description
----------------|------------------
`404`           | No such item
`500`           | Internal error


### DELETE link

```
DELETE /link/:identifier
```

Require authorization header with basic authentication

**cURL (example)**
```curl
curl -X DELETE \
  http://localhost:4200/link/W2gcva \
  -H 'Authorization: Basic dGVzdD====' \
  -H 'Content-Type: application/json' \
```

**Response (example)**
```json
{}
```

**Error codes**

code            | description
----------------|------------------
`404`           | No such item
`500`           | Internal error
