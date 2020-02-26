$(document).ready(function () {
    loadArMaterials();

    $('#createArMaterialModal').click(function () {
    });

    $('#createArMaterialModal').on('shown.bs.modal', function () {
    })

    $('#createNewArMaterial').click(function () {
        var preloader = document.getElementById("createArMaterialPreloader");
        preloader.setAttribute("class", "mdl-spinner mdl-js-spinner is-active");
        createNewArMaterial();
    });
});

function loadArMaterials(){
    var preloader = document.getElementById("loadArMaterialTablePreloader");
    preloader.setAttribute("class", "mdl-spinner mdl-js-spinner is-active");
    var arMaterials = [];
    var table = document.getElementById('arMaterialTable');

    
    //load data from MongoDb
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/ar/arMaterials",   
        "method": "GET",
        "headers": {
        "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "success": function(res){
            //clear table
            var originalRowsLength = table.rows.length;
            if(originalRowsLength>2){                       
                for(var i = 2; i <originalRowsLength; i++)
                {
                    table.deleteRow(2);
                }
            }
    
            arMaterials = res;
            arMaterials.map((am, i)=>{
                // Create an empty <tr> element and add it to the 1st position of the table:
                var row = table.insertRow(2+i);                                          

                // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element://
                var noCell = row.insertCell(0);
                var desCell = row.insertCell(1);
                var imageFileCell = row.insertCell(2);
                var modelFileCell = row.insertCell(3);
                var textureFileCell = row.insertCell(4);   
                var TLGFmodelFileCell = row.insertCell(5); 
                var PNGFileCell = row.insertCell(6);     
                var documentFileCell = row.insertCell(7); 
                var timeCell = row.insertCell(8);               
                var actCell = row.insertCell(9);                

                // Add some text to the new cells:
                noCell.innerHTML = i+1;
                noCell.setAttribute("class", "mdl-data-table__cell--non-numeric");
                noCell.setAttribute("id", am._id);
                
                desCell.innerHTML = am.description;
                desCell.setAttribute("class", "mdl-data-table__cell--non-numeric");
                desCell.style.wordBreak = "break-all";
                desCell.style.whiteSpace = "normal";
                desCell.style.width = "500px";
                
                imageFileCell.setAttribute("class", "mdl-data-table__cell--non-numeric");
                imageFileCell.style.workBreak = "break-all";
                imageFileCell.style.whiteSpace = "normal";
                imageFileCell.style.width = "150px";
                var imageDownloadIcon = document.createElement("span");
                imageDownloadIcon.setAttribute("class", "glyphicon glyphicon-download");
                imageDownloadIcon.style.marginLeft = '5px';
                imageDownloadIcon.style.color = 'gray';
                var imageHref = document.createElement("a");
                imageHref.innerHTML = am.imageName;
                imageHref.style.color = "black";
                imageHref.style.fontWeight = '400';
                imageHref.setAttribute("href", am.imageLocation);
                imageFileCell.appendChild(imageHref);
                imageFileCell.appendChild(imageDownloadIcon);
                
                modelFileCell.setAttribute("class", "mdl-data-table__cell--non-numeric");
                modelFileCell.style.workBreak = "break-all";
                modelFileCell.style.whiteSpace = "normal";
                modelFileCell.style.width = "150px";
                var modelDownloadIcon = document.createElement("span");
                modelDownloadIcon.setAttribute("class", "glyphicon glyphicon-download");
                modelDownloadIcon.style.marginLeft = '5px';
                modelDownloadIcon.style.color = 'gray';
                var modelHref = document.createElement("a");
                modelHref.innerHTML = am.modelName;
                modelHref.style.color = "black";
                modelHref.style.fontWeight = '400';
                modelHref.setAttribute("href", am.modelLocation);
                modelFileCell.appendChild(modelHref);
                modelFileCell.appendChild(modelDownloadIcon);


                textureFileCell.setAttribute("class", "mdl-data-table__cell--non-numeric");
                textureFileCell.style.workBreak = "break-all";
                textureFileCell.style.whiteSpace = "normal";
                textureFileCell.style.width = "150px";
                var textureDownloadIcon = document.createElement("span");
                textureDownloadIcon.setAttribute("class", "glyphicon glyphicon-download");
                textureDownloadIcon.style.marginLeft = '5px';
                textureDownloadIcon.style.color = 'gray';
                var textureHref = document.createElement("a");
                textureHref.innerHTML = am.textureName;
                textureHref.style.color = "black";
                textureHref.style.fontWeight = '400';
                textureHref.setAttribute("href", am.textureLocation);
                textureFileCell.appendChild(textureHref);
                textureFileCell.appendChild(textureDownloadIcon);


                TLGFmodelFileCell.setAttribute("class", "mdl-data-table__cell--non-numeric");
                TLGFmodelFileCell.style.workBreak = "break-all";
                TLGFmodelFileCell.style.whiteSpace = "normal";
                TLGFmodelFileCell.style.width = "150px";
                var TLGFmodelDownloadIcon = document.createElement("span");
                TLGFmodelDownloadIcon.setAttribute("class", "glyphicon glyphicon-download");
                TLGFmodelDownloadIcon.style.marginLeft = '5px';
                TLGFmodelDownloadIcon.style.color = 'gray';
                var TLGFmodelHref = document.createElement("a");
                TLGFmodelHref.innerHTML = am.TLGFmodelName;
                TLGFmodelHref.style.color = "black";
                TLGFmodelHref.style.fontWeight = '400';
                TLGFmodelHref.setAttribute("href", am.TLGFmodelLocation);
                TLGFmodelFileCell.appendChild(TLGFmodelHref);
                TLGFmodelFileCell.appendChild(TLGFmodelDownloadIcon);


                PNGFileCell.setAttribute("class", "mdl-data-table__cell--non-numeric");
                PNGFileCell.style.workBreak = "break-all";
                PNGFileCell.style.whiteSpace = "normal";
                PNGFileCell.style.width = "150px";
                var PNGHref = document.createElement("a");
                PNGHref.innerHTML = am.PNG_names;
                PNGHref.style.color = "black";
                PNGHref.style.fontWeight = '400';
                PNGFileCell.appendChild(PNGHref);


                documentFileCell.setAttribute("class", "mdl-data-table__cell--non-numeric");
                documentFileCell.style.workBreak = "break-all";
                documentFileCell.style.whiteSpace = "normal";
                documentFileCell.style.width = "150px";
                var documentHref = document.createElement("a");
                documentHref.innerHTML = am.document_names;
                documentHref.style.color = "black";
                documentHref.style.fontWeight = '400';
                documentFileCell.appendChild(documentHref);

                

                timeCell.innerHTML = new Date(am.TimeStamp).toISOString().slice(0,10).replace(/-/g,"/");
                
                actCell.setAttribute("class", "controls mdl-data-table__cell--non-numeric");
                var viewButton = document.createElement("button");
                viewButton.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect");
                viewButton.setAttribute("arMaterialId", am._id);
                viewButton.setAttribute("imageName", am.imageName);
                viewButton.setAttribute("imageLocation", am.imageLocation);
                viewButton.setAttribute("modelName", am.modelName);
                viewButton.setAttribute("modelLocation", am.modelLocation);
                viewButton.setAttribute("textureName", am.textureName);
                viewButton.setAttribute("textureLocation", am.textureLocation);
                viewButton.setAttribute("TLGFmodelName", am.TLGFmodelName);
                viewButton.setAttribute("TLGFmodelLocation", am.TLGFmodelLocation);
                viewButton.setAttribute("description", am.description);
                viewButton.innerHTML = "预览";
                viewButton.addEventListener('click', function(e) {
                    var img = document.getElementById("previewImage");
                    var div = document.getElementById("imageDescription");
                    console.log(e)
                    var imageName = e.target.offsetParent.getAttribute("imageName");
                    var imageLocation = e.target.offsetParent.getAttribute("imageLocation");
                    var description = e.target.offsetParent.getAttribute("description");
                    img.src="";
                    if(imageLocation!="" || imageLocation!=undefined){
                        img.src = imageLocation;
                        img.style.display = "";
                        img.alt = imageName;
                        div.innerHTML = description;
                    } else{
                        img.style.display = "none";
                    }
                }, false);
                var removeButton = document.createElement("button");
                removeButton.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect");
                removeButton.setAttribute("arMaterialId", am._id);
                removeButton.setAttribute("imageLocation", am.imageLocation);
                removeButton.setAttribute("modelLocation", am.modelLocation);
                removeButton.setAttribute("textureLocation", am.textureLocation);
                removeButton.setAttribute("TLGFmodelLocation", am.TLGFmodelLocation);
                removeButton.innerHTML = "移除";
                removeButton.style.marginLeft = '5px';
                removeButton.addEventListener('click', function(e){
                    var targetElement = e.target || e.srcElement;
                    var arMaterialId = targetElement.getAttribute("arMaterialId");
                    var imageLocation = targetElement.getAttribute("imageLocation");
                    var modelLocation = targetElement.getAttribute("modelLocation");
                    var textureLocation = targetElement.getAttribute("textureLocation");
                    var TLGFmodelLocation = targetElement.getAttribute("TLGFmodelLocation");
                    deleteArMaterial(arMaterialId, imageLocation, modelLocation, textureLocation, TLGFmodelLocation);
                }, false);
                actCell.appendChild(viewButton);
                actCell.appendChild(removeButton);

            })
        }
    }
    
    $.ajax(settings).done(function (response) {
        preloader.setAttribute("class", "mdl-spinner mdl-js-spinner");
        console.log(response);
    });
}

function deleteArMaterial(id, imageLocation, modelLocation, textureLocation, TLGFmodelLocation){
    console.log("deleteArMaterial " + id);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/ar/arMaterials/"+id,  
        "type": "POST",
        "headers": {
        "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": "application/json",
        "data": JSON.stringify({"imageLocation": imageLocation, "modelLocation": modelLocation, "textureLocation": textureLocation, "TLGFmodelLocation": TLGFmodelLocation}),
        "success": function (res) {
            console.log(res);
            loadArMaterials();
        },
        "error": function (err) {
            console.log(err);
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function createNewFile(){
    var imageFile = $('#ArImageFile')[0].files[0];
    var formData = new FormData();
    formData.append('arMaterial', imageFile);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/ar/files",
        "method": "POST",
        "headers": {
        "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "data": formData
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function createNewArMaterial() {
    var title = $('#newArMaterialTitle').val();
    var imageFile = $('#ArImageFile')[0].files[0];
    var modelFile = $('#ArModelFile')[0].files[0];
    var textureFile = $('#ArTextureFile')[0].files[0];
    var TLGFmodelFile = $('#ArTLGFmodelFile')[0].files[0];
    window.aaa = textureFile
    window.aab = modelFile
    var postData = JSON.stringify({ 'description': title, 'arMaterial': [imageFile, modelFile, textureFile, TLGFmodelFile] });
    

    // jQuery.post({
    //   url: '/api/ar/arMaterials',
    //   contentType: 'application/json',
    //   data: postData,
    //   success: function (res) {
    //     console.log(res);
    //     $('#createArMaterialModal').modal('toggle');
    //   },
    //   error: function (err) {
    //     console.log(err);
    //   }
    // });

    var formData = new FormData();
    var png_len = 0;
    var index_doc = 4;

    formData.append('arMaterial', imageFile);
    formData.append('arMaterial', (modelFile)?(modelFile):(null));
    if(!modelFile)
    {
        index_doc =1;
    }
    formData.append('arMaterial', (textureFile)?(textureFile):(null));
    formData.append('arMaterial', (TLGFmodelFile)?(TLGFmodelFile):(null));
    formData.append('description', title);
    
    
    //formData.append('index_PNG', index_PNG);
 
    var _count2 = document.querySelector("#file_pool2").childElementCount;
    console.log(_count2)
    for(i=0 ; i<_count2; i++){

        png_len += 1
        index_doc += 1
        console.log("f2"+document.querySelector("#file_pool2").children[i].files[0])
        formData.append('arMaterial',document.querySelector("#file_pool2").children[i].files[0])
    }

    var _count = document.querySelector("#file_pool").childElementCount;
    for(i=0 ; i<_count; i++){
        console.log(document.querySelector("#file_pool").children[i].files[0])
        formData.append('arMaterial',document.querySelector("#file_pool").children[i].files[0])
    }

    formData.append('index_doc', index_doc);
    formData.append('png_len', png_len);

   
    console.log("hi"+formData);
    window.fff = formData
    debugger
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/ar/arMaterials",  
        "method": "POST",
        "headers": {
        "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "data": formData,
        "success": function (res) {
            console.log(res);
            $('#createArMaterialModal').modal('toggle');
            loadArMaterials();
        },
        "error": function (err) {
            console.log(err);
        }
    }
    
    $.ajax(settings).done(function (response) {
        var preloader = document.getElementById("createArMaterialPreloader");
        preloader.setAttribute("class", "mdl-spinner mdl-js-spinner");
        console.log(response);
    });
  }