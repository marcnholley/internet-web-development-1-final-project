<!--Marc Holley, 12/14/15, CIS133DA 24202, Dr. Deb LaVergne-->
<!DOCTYPE html >
<html lang="en" >
	<!--Head content-->
	<head>
	<!--Tab Title-->
	<title>Marc Holley's Webpage</title>
	<!--Links to CSS-->
	<link rel="stylesheet" href="marc.css" type="text/css"/>
	<!--Javascript for IE9 compatibility-->
<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js">
</script>
<![endif]-->
  	</head>
	<!--Body content-->
	<body>
	<div id="wrapper">
	<!--Page Title-->
	<!--Header-->
	<!--Headline 1-->
	<header><h1>Marc Holley Resume Page</h1></header>
	<!--Division id-->
	<div id="content">
	<!--Headline 2-->
	<h2>We will be contacting you soon!</h2>
	<h2>Here is the information you entered:</h2><br>
	<script>
             var formData = location.search;
             formData = formData.substring(1, formData.length);
             while (formData.indexOf("+") !== -1) {
                formData = formData.replace("+", " ");
             }
             formData = decodeURIComponent(formData);
             var formArray = formData.split("&");
             for (var i = 0; i < formArray.length; i = i + 1) {
                document.write("<p>" + formArray[i] + "</p>");
             }
         </script>
<br>
<br>
<br>
<br>
<br>
<form action="#">
<input type="button" value = "Back" onclick="javascript:history.go(-1)" />
</form>
</div>
</div>
</body>
</html>