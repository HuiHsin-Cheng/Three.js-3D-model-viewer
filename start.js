/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const PORT = process.env.PORT || 3000;
const config = require('./config');
if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
    return;
}

let app = express();
//enable CORS
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use('/api/forge/oauth', require('./routes/oauth'));
app.use('/api/forge/oss', require('./routes/oss'));
app.use('/api/forge/modelderivative', require('./routes/modelderivative'));
app.use('/api/ar', require('./routes/s3FileUpload'));
app.use('/uploads', express.static(__dirname + '/uploads'))
app.get('/vr', function(req, res) {
    res.sendFile((__dirname + '/0322.html'));
});

app.use('/libs', express.static(__dirname+'/libs'))


app.use('/api/forge', (err, req, res, next) => {
    res.status(err.statusCode).json(err);
});
// app.set('host', process.env.HOST || '192.168.0.80');//ip setting
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
