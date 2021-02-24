
# Angular Záró Csapat Projekt

## Feladat
Készítsetek egy admin felületet Angular segítségével, a megadott 
sablon alapján.

## Az alkalmazás leírása
Az alkalmazás feladata, hogy egy webáruház termékeit, rendeléseit, 
vásárlóit nyilvántartsa, kezelje és statisztikai adatokat szolgáltasson 
az összefoglaló oldalon.  

__Megjelenése:__  
- Az alkalmazást a mellékelt minták alapján kell elkészíteni, amelyek a 
`material-dashboard-master` nevű almappában találhatók.
- Az alkalmazás egy fejléccel és egy bal oldali navigációval rendelkezik. Az 
egyes oldalak között a bal oldali navigáció segítségével lehet váltani.  

__Főbb részei:__  
- Dashboard: ez a főoldal, itt jelennek meg a statisztikák a vásárlókról, 
termékekről, rendelésekről és a pénzügyi adatokról. Opcionálisan grafikus 
formában is megjeleníthetőek.
- Termékek: táblázatos formában jelennek meg a termékek, minden terméksor 
utolsó cellájában szerkesztés és törlés gombokkal. Itt van lehetőség új termék 
felvételére is.
- Vásárlók: táblázatos formában jelennek meg a vásárlók, minden sor utolsó 
cellájában szerkesztés és törlés gombokkal. Van lehetőség új vásárló rögzítésére 
is.
- Rendelések: a termékekhez és a vásárlókhoz hasonlóan táblázatban jelennek meg 
a törölhető és szerkeszthető rendelések. Új rendelést is lehet rögzíteni.
- Pénztár: a rendelések alapján kiállított számlákat jeleníti meg táblázatos 
formában. Van lehetőség új számla kézi rögzítésére is.  

__Közös jellemzők:__  
- Minden táblázat szűrhető az összes oszlop alapján. Minden táblázat rendezhető 
az összes oszlop alapján csökkenő és növekvő sorrendben is.
- Minden entitáshoz (ezek az adattípusok, mint például a termék vagy a rendelés) 
tartozik egy szerkesztő komponens is, ami a táblázat adott sorában lévő 
szerkesztő gombra kattintva jelenik meg. Ennek érelemszerűen nincs külön 
menüpontja.
- Az entitások szerkesztésénél a szerkesztő mezőknak illeszkedniük kell az 
adattípushoz, azaz ha boolean típusú az adat akkor checkbox, ha listából kell 
kiválasztani az értéket akkor legördülő menü, ha hosszabb szöveg akkor textarea 
és egyéb esetben a megfelelő típusú input mező jelenjen meg a szerkesztő 
űrlapon.
- Legyenek felugró üzenetek amelyek értesítik a felhasználót a sikeres 
műveletekről vagy az esetleges hibákról.

## Előkészítés
- A csapat egyik tagja forkolja a következő repo -t:
- `https://github.com/cherryApp/str-angular-project-big`
- Hívja meg a többieket együttműködőknek a github felületén.
- Mindenki klónozza le magának a forkolt repo -t.
- Készítsen a saját gépén egy új Angular alkalmzást.
- Kösse össze a Github repoval.

## Technikai leírás - fejlesztés lépései
### 1. Szükséges osztályok
A leírás alapján látható, hogy milyen osztályokra lesz szükség a fejlesztés 
során.
- Category (id, name, description)
- Product (id, name, type, catID, description, price, featured, active)
- Address (zip, country, city, street, notes)
- Customer (id, firstName, lastName, email, address:Address, active)
- Order (id, customerID, productID, amount, status:new|shipped|paid)
- Bill (id, orderID, amount, status:new|paid)  
> Ha szükséges akkor a tárolt adatok listája tovább bővíthető, de ezeknek 
minimálisan szerepelniük kell az osztályokban.

### 2. Szükséges szolgáltatások
A szolgáltatások felelnek az adatok kezeléséért, azok mozgatásáért az adatbázis 
szerver (json-server) és a komponensek között. 
- Minden fő adattípushoz tartozzon egy szolgáltatás 
(product, customer, order, bill).
- Az adatokat .json fájlban tároljuk, ezek lehetnek egy fájlban is azért, hogy 
ne kelljen mindegyikhez külön json-server -t indítani.
- Az adattartalom tetszőleges. Minden csapat válasszon magának egy termékkört, 
amelyet a webshop forgalmaz és annak megfelelően vegye fel a termékek adatait.
- Az egyes szervizek legyenek képesek az alapvető adatműveletekre (CRUD) és 
támogassák a speciális keresést is ha szükséges.

### 3. Szerkesztő komponensek
Minden entitáshoz (adattípushoz) tartoznak szerkesztő oldalak. Ezek egységesen 
a következőek szerint működjenek.
- Az url alapján döntsék el, hogy melyik entitást kérik le az adatbázisból.
- Érdemes a nevüket mindig az edit- előtaggal kezdeni a könnyebb azonosítás 
érdekében, például: edit-product vagy edit-bill.
- Ha nem kapnak megjeleníthető adatot, akkor automatikusan egy új entitást 
hozzanak létre. Például, ha egy üres Product példányt kapnak 0 id -vel, abból 
tudják, hogy nem az update hanem a create metódust kell meghívniuk a kapcsolódó 
szervízből.
- Minden adat kötelező legyen. 
- Minden adatot validálni kell, a tanult `Template Driven` űrlap technikákkal.
- Ha nincs megfelelően kitöltve az űrlap, akkor ne engedje elküldeni az adatokat 
és jelenítsen meg releváns hibaüzenetet.
- Sikeres mentés vagy hiba esetén jelenjen meg felugró üzenet. Ezt több féle 
kiegészítővel is meg lehet valósítani, néhány példa:  
[Ng Toaster](https://www.npmjs.com/package/ngx-toaster)  
[Ng Toastr](https://www.npmjs.com/package/ngx-toastr)  
- Létrehozás vagy módosítás után a komponens navigáljon vissza a hozzá tartozó 
listához. Például, ha sikersen módosították a számlát, akkor a számla listázó 
oldal nyíljon meg.

### 4. Listázó oldalak
- Ezeken az oldalakon táblázatos formában jelennek meg az entitások. 
- Mindhez tartozik szerkesztés és törlés gomb is. Szerkesztés esetén az 
alkalmazás a kapcsolódó szerkesztőfelületre navigál. Például, ha a rendelés 
táblázat egyik sorában kattintottak a szerkesztés gombra, akkor az EditOrder komponens nyílik meg.
- Minden táblázat felett legyen egy teljes szélességű gomb, ami az új entitás 
létrehozását indítja el. Ekkor is a kapcsolódó editor nyílik meg, csak egy üres 
űrlappal.
- Az adatok szűrhetőek az összes oszlop szerint a táblázat felett elhelyezett 
beviteli mező segítségével.
- Az adatok rendezhetőek az összes oszlop szerint növekvő és csökkenő sorrendbe 
is. Ezt az oszlop fejlécére kattintva lehet kezdeményezni, ami mellett egy ikon 
jelzi, hogy éppen milyen irányú a rendezés. Első kattintásra mindig növekvő 
a rendezési sorrend, ha pedig másodszor is ugyanarra az oszlopfejlécre 
kattintanak, akkor csökkenő irányú.

### 5. Dashboard
Ez az alkalmazás kezdő oldala. Itt alapvetően áttekintő nézet jelenik meg a 
webshop állapotáról.  
__Megjelenített adatok:__  
- Aktív termékek száma.
- Aktív vásárlók száma.
- Még nem fizetett rendelések száma.
- Még nem fizetett számlák összege.
- Opcionális: ugyanezen adatok grafikonon történő megjelnítése. Például a 
rendelések grafikon külön oszlopokban mutatja a különböző státuszú rendelések 
számát, vagy a számlák összegét láthatjuk státuszuk szerint.

## Megjelenés
A projekt mappájában mellékeltünk egy teljes keretrendszert a megjelenítéshez. 
Ez Bootstrap alapú, kiegészítve saját css állományokkal.  
__Hogyan használjuk?__  
- Először lokalizáljuk a sablon .html állományokban a fejléc és a navigáció 
elemeit. Ekeznek készítsünk külön komponenseket.
- Az app.component.html állományban helyezzük el ezeket a komponenseket, majd 
az oldal tartalmi részének a helyére szúrjuk be a 
`<router-outlet></router-outlet>` elemet, hogy ott jelenjenek meg az egyes 
komponensek. 
- Keressük meg a sablonokban a szükséges .css és .js állományokat és azokat 
helyezzük el az assets mappában. Ezután szúrjuk be őket az `angular.json` 
állományba a megfelelő helyre, ügyelve a helyes elérési útra.
- A mellékelt sablon alapvetően reszponzív, az Angular alkalmazásnak is annak 
kell lennie.

-------

## Extrák
- Grafikonos megjelenítések a Dashboard oldalon.
- Azoknál a gomboknál, ahol kattintás után a szerver válaszára várunk, legyen 
animáció ami ezt jelzi.
- A táblázatok utolsó sorában legyenek összesítve az oszlopok, például hány 
darab vagy mekkora összeg a szumma egy adott oszlopban.
- A felhasználó szerkeszthesse azt, hogy milyen sorrendben legyenek a táblázatok 
oszlopai.  
Segédlet: https://nettuts.hu/blog/angular-material-tablazat-dinamikus-oszlopokkal

## Sok sikert!























# [Material Dashboard Angular - Free Bootstrap Material Design Admin](https://www.creative-tim.com/product/material-dashboard-angular2)[![version][version-badge]][CHANGELOG]

![Product Gif](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-dashboard-angular/material-dashboard-angular.gif)

**[Material Dashboard Angular](https://www.creative-tim.com/product/material-dashboard-angular2/)** is a free Material Bootstrap Admin with a fresh, new design inspired by Google's Material Design. We are very excited to introduce our take on the material concepts through an easy to use and beautiful set of components. Material Dashboard was built over the popular Bootstrap framework and it comes with a couple of third-party plugins redesigned to fit in with the rest of the elements.

Material Dashboard makes use of light, surface and movement. The general layout resembles sheets of paper following multiple different layers, so that the depth and order is obvious. The navigation stays mainly on the left sidebar and the content is on the right inside the main panel.

This product came as a result of users asking for a material dashboard after we released our successful [Material Kit](http://www.creative-tim.com/product/material-kit). We developed it based on your feedback and it is a powerful bootstrap admin dashboard, which allows you to build products like admin panels, content managements systems and CRMs.

Material Dashboard comes with 5 color filter choices for both the sidebar and the card headers (blue, green, orange, red and purple) and an option to have a background image on the sidebar.

Material Dashboard uses a framework built by our friend [Federico - Bootstrap Material Design](http://fezvrasta.github.io/bootstrap-material-design/), who did an amazing job creating the backbone for the material effects, animations, ripples and transitions. Big thanks to his team for the effort and forward thinking they put into it.

Special thanks go to:
[Robert McIntosh](https://github.com/mouse0270/bootstrap-notify) for the notification system.
[Chartist](https://gionkunz.github.io/chartist-js/) for the wonderful charts.
We are very excited to share this dashboard with you and we look forward to hearing your feedback!

You can find the Github Repo here.

## Table of Contents

* [Versions](#versions)
* [Demo](#demo)
* [Quick Start](#quick-start)
* [Documentation](#documentation)
* [File Structure](#file-structure)
* [Browser Support](#browser-support)
* [Resources](#resources)
* [Reporting Issues](#reporting-issues)
* [Technical Support or Questions](#technical-support-or-questions)
* [Licensing](#licensing)
* [Useful Links](#useful-links)


## Versions

[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/html-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/material-dashboard)
[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/angular-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/material-dashboard-angular2)
[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/vue-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/vue-material-dashboard)
[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/react-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/material-dashboard-react)

| HTML | Angular | Vue | React |
| --- | --- | --- | --- |
| [![Material Dashboard HTML](https://github.com/creativetimofficial/public-assets/blob/master/material-dashboard-html/material-dashboard.jpg?raw=true)](https://www.creative-tim.com/product/material-dashboard) | [![Material Dashboard Angular](https://github.com/creativetimofficial/public-assets/blob/master/material-dashboard-angular/material-dashboard-angular.jpg?raw=true)](https://www.creative-tim.com/product/material-dashboard-angular2) | [![Vue Material Dashboard ](https://github.com/creativetimofficial/public-assets/blob/master/vue-material-dashboard/vue-material-dashboard.jpg?raw=true)](https://www.creative-tim.com/product/vue-material-dashboard) | [![Material Dashboard React](https://github.com/creativetimofficial/public-assets/blob/master/material-dashboard-react/material-dashboard-react.jpg?raw=true)](https://www.creative-tim.com/product/material-dashboard-react)

## Demo

| Dashboard | User Profile | Tables | Icons | Notifications |
| --- | --- | --- | --- | --- |
| [![Start page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-dashboard-angular/dashboard.png?raw=true)](https://demos.creative-tim.com/material-dashboard-angular2/#/dashboard) | [![User profile page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-dashboard-angular/user-profile.png?raw=true)](https://demos.creative-tim.com/material-dashboard-angular2/#/user-profile) | [![Tables page ](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-dashboard-angular/tables.png?raw=true)](https://demos.creative-tim.com/material-dashboard-angular2/#/table-list) | [![Icons Page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-dashboard-angular/icons.png?raw=true)](https://demos.creative-tim.com/material-dashboard-angular2/#/maps) | [![Notifications page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-dashboard-angular/notifications.png?raw=true)](https://demos.creative-tim.com/material-dashboard-angular2/#/notifications)

[View More](https://demos.creative-tim.com/material-dashboard-angular2/#/dashboard).

## Quick start

Quick start options:

- [Download from Github](https://github.com/tiniestory/material-dashboard-angular2/archive/master.zip).
- [Download from Creative Tim](http://www.creative-tim.com/product/material-dashboard-angular2).

## Terminal Commands

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0 and angular 4.x.

1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to your file project
4. Make sure you have installed [Angular CLI](https://github.com/angular/angular-cli) already. If not, please install.
5. Run in terminal: ```npm install```
6. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### What's included

Within the download you'll find the following directories and files:

```
material-dashboard-angular
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── angular-cli.json
├── documentation
├── e2e
├── karma.conf.js
├── package-lock.json
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── components
│   │   │   ├── components.module.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.css
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.spec.ts
│   │   │   │   └── footer.component.ts
│   │   │   ├── navbar
│   │   │   │   ├── navbar.component.css
│   │   │   │   ├── navbar.component.html
│   │   │   │   ├── navbar.component.spec.ts
│   │   │   │   └── navbar.component.ts
│   │   │   └── sidebar
│   │   │       ├── sidebar.component.css
│   │   │       ├── sidebar.component.html
│   │   │       ├── sidebar.component.spec.ts
│   │   │       └── sidebar.component.ts
│   │   ├── dashboard
│   │   │   ├── dashboard.component.css
│   │   │   ├── dashboard.component.html
│   │   │   ├── dashboard.component.spec.ts
│   │   │   └── dashboard.component.ts
│   │   ├── icons
│   │   │   ├── icons.component.css
│   │   │   ├── icons.component.html
│   │   │   ├── icons.component.spec.ts
│   │   │   └── icons.component.ts
│   │   ├── layouts
│   │   │   └── admin-layout
│   │   │       ├── admin-layout.component.html
│   │   │       ├── admin-layout.component.scss
│   │   │       ├── admin-layout.component.spec.ts
│   │   │       ├── admin-layout.component.ts
│   │   │       ├── admin-layout.module.ts
│   │   │       └── admin-layout.routing.ts
│   │   ├── maps
│   │   │   ├── maps.component.css
│   │   │   ├── maps.component.html
│   │   │   ├── maps.component.spec.ts
│   │   │   └── maps.component.ts
│   │   ├── notifications
│   │   │   ├── notifications.component.css
│   │   │   ├── notifications.component.html
│   │   │   ├── notifications.component.spec.ts
│   │   │   └── notifications.component.ts
│   │   ├── table-list
│   │   │   ├── table-list.component.css
│   │   │   ├── table-list.component.html
│   │   │   ├── table-list.component.spec.ts
│   │   │   └── table-list.component.ts
│   │   ├── typography
│   │   │   ├── typography.component.css
│   │   │   ├── typography.component.html
│   │   │   ├── typography.component.spec.ts
│   │   │   └── typography.component.ts
│   │   ├── upgrade
│   │   │   ├── upgrade.component.css
│   │   │   ├── upgrade.component.html
│   │   │   ├── upgrade.component.spec.ts
│   │   │   └── upgrade.component.ts
│   │   └── user-profile
│   │       ├── user-profile.component.css
│   │       ├── user-profile.component.html
│   │       ├── user-profile.component.spec.ts
│   │       └── user-profile.component.ts
│   ├── assets
│   │   ├── css
│   │   │   └── demo.css
│   │   ├── img
│   │   └── scss
│   │       ├── core
│   │       └── material-dashboard.scss
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
├── tslint.json
└── typings

```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">



## Resources
- Demo: <https://demos.creative-tim.com/material-dashboard-angular2/#/dashboard>
- Download Page: <https://www.creative-tim.com/product/material-dashboard-angular2>
- Documentation: <https://demos.creative-tim.com/material-dashboard-angular2/#/documentation/tutorial>
- License Agreement: <https://www.creative-tim.com/license>
- Support: <https://www.creative-tim.com/contact-us>
- Issues: [Github Issues Page](https://github.com/creativetimofficial/material-dashboard-angular2/issues)
- [Material Kit](https://www.creative-tim.com/product/material-kit?ref=github-mda-free) - For Front End Development

## Reporting Issues

We use GitHub Issues as the official bug tracker for the Material Dashboard. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Material Dashboard. Check the CHANGELOG from your dashboard on our [website](https://www.creative-tim.com/).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.


## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](https://www.creative-tim.com/contact-us) instead of opening an issue.



## Licensing

- Copyright 2018 Creative Tim (https://www.creative-tim.com/)

- Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-angular2/blob/master/LICENSE.md)


## Useful Links

- [More products](https://www.creative-tim.com/bootstrap-themes) from Creative Tim
- [Tutorials](https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w)
- [Freebies](https://www.creative-tim.com/bootstrap-themes/free) from Creative Tim
- [Affiliate Program](https://www.creative-tim.com/affiliates/new) (earn money)

##### Social Media

Twitter: <https://twitter.com/CreativeTim>

Facebook: <https://www.facebook.com/CreativeTim>

Dribbble: <https://dribbble.com/creativetim>

Google+: <https://plus.google.com/+CreativetimPage>

Instagram: <https://www.instagram.com/CreativeTimOfficial>

[CHANGELOG]: ./CHANGELOG.md

[version-badge]: https://img.shields.io/badge/version-2.5.0-blue.svg
#   s t r - a n g u l a r - p r o j e c t - b i g 
 
 