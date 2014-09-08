$(function () {

	   $('.wrapper_el_projets').click(function(){
			$('.wrapper_el_projets').css({"border" : "", "border-radius": "", "box-shadow" : " 1px 1px 2px 2px #fff" });
			$(this).css({"border" : " 1px solid #ccc", "border-radius": " 5px", "box-shadow" : " 1px 1px 2px 2px #ccc" });
			$('.projet_el_liste_bas').css({"display" : "none"});
			$(this).children('.expandlink').children('.projet_el_liste_bas').css('display','block');
    });
	
	
	 $("#defprofil>form>div").hide();
	$("#fos_choix_type_membre").prop("selectedIndex", -1);
	
	
     $('#fos_choix_type_membre option').click(function(){
	 $("#defprofil>form>div").hide();
        if (this.value == 0){ 
            $("#young").show();           
        }
		if (this.value == 1){ 
            $("#instM").show();           
        }
	   if (this.value == 2){ 
            $("#assoM").show();           
        }
		
    })
	
 $('#assoM_associations').chosen({width: "50%", placeholder_text_single: "Rechercher"});
 $('#young_institutions').chosen({width: "50%", placeholder_text_single: "Rechercher"});
 $('#instM_institutions').chosen({width: "50%", placeholder_text_single: "Rechercher"});
});