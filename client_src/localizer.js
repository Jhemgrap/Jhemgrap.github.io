/*
Copyright (C) 2021  torn.space (https://torn.space)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
const eng = 'english.json';
const esp = 'spanish.json';
const pyc = 'russian.json';
const deu = 'german.json';
const frn = 'french.json';
const tki = 'tokipona.json';
const chn = 'chinese.json';

global.languagejson = null;

global.jsn = require('../client/weapons.json');

global.setLang = function(name) {
  document.cookie = ('lang=' + name);
  loadLang(name);
};
function load(lang) {
  const request = new XMLHttpRequest();
  request.open('GET', lang, false);

  let data = '';
  request.onload = function(e) {
    if (request.readyState === 4) {
      data = request.responseText;
    }
  };

  request.send(null);
  return JSON.parse(data);
}

global.loadLang = function(name) {
  global.languageNumber = 0;
  let assigned = null;
  
  if (location.href.includes("eng") || name === "eng") {assigned = languagejson = eng; languageNumber = 0;}
  //if (location.href.includes("frn") || name === "frn") {assigned = languagejson = frn; languageNumber = 0;}
  if (location.href.includes("esp") || name === "esp") {assigned = languagejson = esp; languageNumber = 1;}
  //if (location.href.includes("pyc") || name === "pyc") {assigned = languagejson = pyc; languageNumber = 0;}
  //if (location.href.includes("deu") || name === "deu") {assigned = languagejson = deu; languageNumber = 0;}
  if (location.href.includes("tki") || name === "tki") {assigned = languagejson = tki; languageNumber = 2;}
  if (location.href.includes("chn") || name === "chn") {assigned = languagejson = chn; languageNumber = 3;}

  if (!assigned) {
      let lang = document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/, "$1");

      if (lang === "frn") {
//          languagejson = frn;
      } else if (lang === "esp") {
          languagejson = esp;
          languageNumber = 1;
      } else if (lang === "pyc") {
//          languagejson = pyc;
      } else if (lang === "eng") {
//          languagejson = eng;
      } else if (lang == "deu") {
//          languagejson = deu;
      } else if (lang == "tki") {
          languagejson = tki;
          languageNumber = 2;
      } else if (lang == "chn") {
          languagejson = chn;
          languageNumber = 3;
      }
  }

  if (languagejson == null) {
      languagejson = eng;
  }

  languagejson = load(languagejson);

  jsn.achNames = languagejson.achNames;
  jsn.splashes = languagejson.splashes;

  jsn.lore = languagejson.lore;
  for (let i = 0; i < Object.keys(jsn.weapons).length; i++) {
    jsn.weapons[i].name = languagejson.weapons[i].name;
    jsn.weapons[i].desc = languagejson.weapons[i].desc;
  }
  for (let i = 0; i < Object.keys(jsn.ships).length; i++) {
    jsn.ships[i].nameA = languagejson.ships[i].nameA;
    jsn.ships[i].nameH = languagejson.ships[i].nameH;
    jsn.ships[i].nameC = languagejson.ships[i].nameC;
    jsn.ships[i].desc = languagejson.ships[i].desc;
  }
  global.mEng = load("translate.json");
  global.splash = jsn.splashes[Math.floor(Math.random() * jsn.splashes.length)];
  if (!splash.endsWith('!') && !splash.endsWith('?')) splash += '...';
};
