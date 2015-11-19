	var terminy = [];
	var odpowiedzialni = [];
	var osoby = [];
	var liczbaElementow;
	var liczbaOsob;
	var liczbaOdpowiedzialnych;
	var aktywnaSciezka;
	var aktywnyTermin;
	var aktywnaOsoba;
	
	aktywnaSciezka = 1;
	liczbaElementow = 0;
	liczbaOsob = 0;
	liczbaOdpowiedzialnych = 0;
	
	function dodajTermin(){	
		var prostokat = document.getElementById('kanwa');
		if (liczbaElementow==0) prostokat.innerHTML = "";
		var polozenie = nowaPozycja();
		var ileCzasu = 80*document.getElementById("czas").value;
		terminy[liczbaElementow] = {sciezka:aktywnaSciezka, pozycja:polozenie, trwanie:ileCzasu};
		var zadanie = document.getElementById("zadanie").value.replace(/ /g,"&nbsp;");
		elementDiv =  			"<div onclick='wskazany(" + liczbaElementow +
								")' class='punkt' " +
								"id='" + liczbaElementow +"' "+
								"title='rozpoczęcie:" + polozenie + ", czas trawnia:"+ileCzasu+"' " +
								"style='left:" + polozenie + 
								"; border-right: " + ileCzasu + 
								"px solid lightblue; top: " + (2 + (aktywnaSciezka-1)*36) + ";'>";
		prostokat.innerHTML += elementDiv + zadanie;
		prostokat.innerHTML +=	"</div>";
		liczbaElementow++;
	}
	
	function nowaPozycja(){
		var pozycjaKolejnegoElementu = 10;
		for (var i=0; i<liczbaElementow; i++) {
			pozycjaKolejnegoElementu += terminy[i].trwanie + 10;
		};
		return pozycjaKolejnegoElementu;
	}
	
	function nowaPozycjaOsoby(){
		var pozycjaKolejnejOsoby = 10;
		for (var i=0; i<liczbaOdpowiedzialnych; i++) {
			if (odpowiedzialni[i].sciezka==aktywnaSciezka) pozycjaKolejnejOsoby += 25;
		};
		return pozycjaKolejnejOsoby;
	}
	
	function wskazany(id){				
		var klocek = document.getElementById(id);
		klocek.setAttribute("class","punktAktywny");
		klocek.style.borderRightColor = "#F00";
		// wygaszenie poprzedniego terminu aktywnego
		if (typeof aktywnyTermin != 'undefined')
		{
			klocek = document.getElementById(aktywnyTermin);
			klocek.setAttribute("class","punkt");
			klocek.style.borderRightColor = "lightblue";
		}
		aktywnyTermin = id;
		alert("Termin zdarzenia=" + terminy[id].pozycja + ", planowany czas=" + terminy[id].trwanie);
	}
	
	function wskazana(id){				
		var kolko = document.getElementById("o" + id);
		kolko.setAttribute("class","koloAktywne");
		// wygaszenie poprzedniej osoby aktywnej
		if (typeof aktywnaOsoba != 'undefined') {
			kolko = document.getElementById("o" + aktywnaOsoba);
			kolko.setAttribute("class","kolo");
		}
		aktywnaOsoba = id;
		alert("Osoba odpowiedzialna: " + odpowiedzialni[id].nazwisko);
	}
	
	function dodajOsobeOdpowiedzialna(){
		var numerOsoby = document.getElementById("kombiOsoby").value;
		var kto = osoby[numerOsoby].nazwisko;
		var kolo = document.getElementById('osoby');
		if (liczbaOdpowiedzialnych==0) kolo.innerHTML = "";
		var polozenie = nowaPozycjaOsoby();
		odpowiedzialni[liczbaOdpowiedzialnych] = { sciezka:aktywnaSciezka, gdzie:polozenie, nazwisko:kto };
		elementDiv = "<div onmouseover='wskazana(" + liczbaOdpowiedzialnych +
					 ")' class='kolo' " +
					 "title='" + kto + "' " +
					 "id='o" + liczbaOdpowiedzialnych +
					 "' style='left: " + polozenie + 
					 "; top: " + (2 + (aktywnaSciezka-1)*36) + ";'" +
					 "></div>";
		//alert(elementDiv);
		kolo.innerHTML += elementDiv;
		liczbaOdpowiedzialnych++;
	}
	
	function wstawWskaznik(sciezka) {			
		var dziobek = document.getElementById("wskaznikSciezki");
		dziobek.style.top = 2+ (sciezka-1)*36;
	}
	
	function zmianaSciezki() {			
		aktywnaSciezka = document.getElementById("sciezki").value;
		wstawWskaznik(aktywnaSciezka);
	}
	
	function zmianaDlugosci() {
	
	}

	function wpiszWielu(){
		var kombi = document.getElementById('kombiOsoby');
		var nowaOsoba1 = document.createElement('option');
		nowaOsoba1.value = 1;
		nowaOsoba1.text = "Jan Kowalski";
		kombi.add(nowaOsoba1);	
		osoby[liczbaOsob++] = {id:liczbaOsob, nazwisko:"Jan Kowalski"};
		var nowaOsoba2 = document.createElement('option');
		nowaOsoba2.value = 2;
		nowaOsoba2.text = "Anna Nowak";
		kombi.add(nowaOsoba2);	
		osoby[liczbaOsob++] = {id:liczbaOsob, nazwisko:"Anna Nowak"};
		var nowaOsoba3 = document.createElement('option');
		nowaOsoba3.value = 3;
		nowaOsoba3.text = "Alicja Bunc";
		kombi.add(nowaOsoba3);	
		osoby[liczbaOsob++] = {id:liczbaOsob, nazwisko:"Alicja Bunc"};
		var nowaOsoba4 = document.createElement('option');
		nowaOsoba4.value = 4;
		nowaOsoba4.text = "Mirosław Poniatowski";
		kombi.add(nowaOsoba4);	
		osoby[liczbaOsob++] = {id:liczbaOsob, nazwisko:"Mirosław Poniatowski"};
		var napis = "";
		for (var i=0; i<liczbaOsob; i++) napis += osoby[i].id + ": " +osoby[i].nazwisko + ",   ";
		alert(napis);
	}
	
	function dopiszDoKombi() {
		var dopisywanaOsoba = document.getElementById('kto');
		var kombi = document.getElementById('kombiOsoby');
		var nowaOsoba = document.createElement('option');
		nowaOsoba.text = dopisywanaOsoba.value;
		nowaOsoba.value = liczbaOsob;
		kombi.add(nowaOsoba);	
		osoby[liczbaOsob++] = {id:liczbaOsob, nazwisko:dopisywanaOsoba.value};
		dopisywanaOsoba.value = "";
		wpiszWielu();
	}
