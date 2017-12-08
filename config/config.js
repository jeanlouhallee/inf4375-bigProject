/*
 * Copyright 2017 Jean-Lou Hallée.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var config = {
        development : {
            listOfAquaticInstallationsUrl : "http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv",
            listOfRinksUrl : "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml",
            listOfWinterSlidesUrl : "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml",
            aquaticInstallationsDb : "AquaticInstallations",
            rinksDb : "Rinks",
            winterSlidesDb : "WinterSlides",
            collection : "Installations",
            mainDb : "inf4375",
            dbServer : "localhost",
            dbServerPort : 27017
        },
        staging : {
            listOfAquaticInstallationsUrl : "http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv",
            listOfRinksUrl : "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml",
            listOfWinterSlidesUrl : "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml",
            aquaticInstallationsDb : "AquaticInstallations",
            rinksDb : "Rinks",
            winterSlidesDb : "WinterSlides",
            collection : "Installations",
            mainDb : "inf4375",
        },
        production: {
            listOfAquaticInstallationsUrl : "http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv",
            listOfRinksUrl : "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml",
            listOfWinterSlidesUrl : "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml",
            aquaticInstallationsDb : "AquaticInstallations",
            rinksDb : "Rinks",
            winterSlidesDb : "WinterSlides",
            collection : "Installations",
            mainDb : "inf4375",
        }
};

module.exports = config;
