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

module.exports = {
  updateCondition: {
    type: "object",
    required: true,
    additionalProperties: false,
    properties: {
      nom: {
        type: "string",
        required: true
      },
      condition: {
        type: "string",
        required: true
      }
    }
  },
  updateCustomer: {
    type: "object",
    required: true,
    additionalProperties: false,
    properties: {
      age: {
        type: "number",
        required: false
      },
      nom: {
        type: "string",
        required: false
      },
      prenom: {
        type: "string",
        required: false
      },
      date_naissance: {
        type: "string",
        format: "date-time",
        required: false
      },
      grades: {
        type: "array",
        required: false,
        items: {
          type: "string",
          required: false
        }
      }
    }
  }
};
