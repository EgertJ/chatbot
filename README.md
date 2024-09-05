# About

Chat-kasutajaliides tehtud NextJS ja Vercel AI SDK-ga.

## QA

### Kirjelda koodi struktuuri ja miks oled just sellised valikud teinud?

Koodi põhiosa on /app kaustas, kus on kood. See on selleks, et eraldada konfiguratsiooni, ning teisi faile ja lehe enda koodi. Samuti nõuab seda NextJS. ReactJS komponendid on eraldi kaustas /app/components, et koodi paremini organiseerida.

### Kirjelda, kuidas sinu loodud chat-kasutajaliideses on tagatud kasutajasõbralikkus?

Kasutajasõbralikkus on tagatud mitme elemendiga. Esiteks on chat-kasutajaliideses ära eraldatud kasutaja poolt sisestatud jutt ja roboti vastused (roboti vastused halliga vasakul ja enda küsimused sinisega paremal). Samuti on iga sõnumi juurde märgitud kes ja mis ajal saatis sõnumi, et vajadusel saaks kasutaja seda jälgida. Uue sõnumi tulekul keritakse chati lõppu, et kasutaja ei peaks terve chati uuesti läbi kerima. Tekstiaken ja saatmisnupp on disabled, kui robot vastab, et ei saaks tekkida segadust. Samuti on tagatud juurdepääsetavus, kasutadades aria-labele'id ja aria-live elemente. Juturoboti vastuste all on ka nupp, millele vajutades saab kuulda roboti vastust. Vea tekkel, näidatakse kasutajale viga ja soovitatakse uuesti proovida.

### Miks kasutad sellist värviskeemi ja tüpograafiat?

Värvi valisin sellise, mis sobituks nii heleda, kui ka tumeda teemaga. Tüpograafia sai valitud Inter, kuna see ongi mõeldud kasutajaliidese tegemisteks, ning on hästi loetav iga ekrrani suurusega.

### Miks kasutad just seda disaini lähenemist (puhas CSS või Tailwind või Bootstrap või Material või muu lähenemine, mida eelistad)?

Kasutan Tailwind CSS ja NextUI lahendusi. Tailwind CSS kasutan, kuna see teeb arendusprotsessi palju kiiremaks ja lihtsamaks, ning hoiab ühtset stiili. NextUI võtsin kasutusele, kuna soovisin ilusaid, animeeritud elemente, millele ei pea ise aega kulutama. Samuti saab elemente ka enda soovi järgi kujundada.

### Kuidas testiksid automaatselt antud rakendust (võid lisada ka testi, kuid see pole kohustuslik)?

Kasutaksin Seleniumit või Cypressi kasutajaliidese testimiseks. Testiks eraldi, kas kõik peamised elemendid on olemas, ning kas töötavad korrektselt.

### Millised ohud ja riskid on seotud näidisrakendusega ning mida teeksid nende maandamiseks?

Kindlasti on üks ohtudest see, kui mingi bot kasutab näidisrakendust ja koormab selle üle, või spämmib seda pidevalt. Selle maandamiseks oleks vaja implementeerida rate-limiting, mis piiraks spämmimist. Kui lisada rakendusele ka andmebaas sõnumite hoiustamiseks, siis tuleks ka valideerida kasutaja sisendeid.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
