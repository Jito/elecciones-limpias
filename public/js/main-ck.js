$(document).ready(function(){$("#map").gmap3({getgeoloc:{callback:function(e){e&&$(this).gmap3({map:{options:{center:e,zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!1,navigationControl:!1,streetViewControl:!1,overviewMapControl:!1,panControl:!1}}})}}});$("#submission-form").easyWizard({showSteps:!1,showButtons:!1,submitButton:!1,debug:!0,after:function(e,t,n){if(n.attr("id")=="step-locate"){var r,i=$("#map").gmap3("get"),s=function(e){console.log(e);$("#submission-lat").val(e.lat());$("#submission-lng").val(e.lng())};$("#step-locate-done").button("loading");$("#map").gmap3({getgeoloc:{callback:function(e){e?r=e:r=i.getCenter();s(r);$(this).gmap3({getmaxzoom:{latLng:r,callback:function(e){i.setCenter(r);i.setZoom(e-2)}},marker:{latLng:r,options:{animation:google.maps.Animation.DROP,draggable:!0},events:{dragend:function(e,t,n){s(e.getPosition())}}}});$("#step-locate-done").button("reset")}}})}},before:function(e,t,n){t.attr("id")=="step-locate"}});$("#submission-form").fileupload({dataType:"json",url:"/upload",previewMaxWidth:200,previewMaxHeight:200,previewCrop:!0,autoupload:!1}).on("fileuploadadd",function(e,t){$.each(t.files,function(e,n){var r=loadImage(n,function(e){$("#upload-preview").html(e)},{maxWidth:150,maxHeight:150,crop:!0});r&&$("#submission-form").easyWizard("goToStep",2);$("#submission-cancel").click(function(){t.abort();$(".step-upload").show();$(".step-positioning").hide();$("#upload-preview").html("")})})}).on("fileuploadprogressall",function(e,t){var n=parseInt(t.loaded/t.total*100,10);$("#upload-progress .progress-bar").css("width",n+"%")}).on("fileuploaddone",function(e,t){$("#upload-preview").html("")});$("#step-locate-done").click(function(){$("#submission-form").easyWizard("goToStep",3)});$("#submission-cancel").click(function(){$("#submission-form").easyWizard("goToStep",1)})});