const valuesCategory = ["Entrada", "Saída"];

let insertedValues = [];

let insertedValuesfiltered = [];

let categoryActived = null

function calcAllValuesForCategory(array = []) {
  const sum = array.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.value;
  }, 0);

  return sum;
}

function filterValues(arrayOld, id) {
  insertedValuesfiltered = arrayOld.filter((current) => {
    return current.categoryID === Number(id);
  });
  return insertedValuesfiltered;
}

function removeValue(id) {
  document.querySelector(`[data-key='${id}']`).remove();

  insertedValuesfiltered = insertedValuesfiltered.filter((e) => {
    return e.id !== id;
  });

  insertedValues = insertedValues.filter((e) => {
    return e.id !== id;
  });

  if(Number(categoryActived) == 0 || Number(categoryActived) == 1){
    insertValueSumInDOM(insertedValuesfiltered);
    analitycsContentValues(`Nenhum valor cadastrado para categoria ${valuesCategory[Number(categoryActived)]}`);
  } else {
    insertValueSumInDOM(insertedValues);
    analitycsContentValues("Nenhum valor cadastrado");
  }

  renderInDom(".values", null);

  return;
}

function analitycsContentValues(message) {
  if (document.querySelector(".value") == null) {
    if (document.querySelector(".message-nothing-values")) {
      document.querySelector(".message-nothing-values").remove();
    }
    document.querySelector(".values").insertAdjacentHTML(
      "beforeend",
      `<button class="bt message-nothing-values" 
            aria-expanded="false"
            aria-controls="create-new-value"
            aria-haspopup="dialog"
            onclick="modalController(this)"
            type="button"
        >
            <h4 class="font-2-bold color-grey-1">${message}</h4>
            <span class="font-3-medium color-grey-2">Registrar novo valor</span>
        </button>`
    );
  } else {
    if (document.querySelector(".message-nothing-values")) {
      document.querySelector(".message-nothing-values").remove();
    }
  }
}

function renderInDom(place = HTMLAllCollection, content, especificRemove) {
  document.querySelectorAll(especificRemove).forEach((e) => {
    e.remove();
  });

  document.querySelector(place).insertAdjacentHTML("beforeend", content ?? "");

  let treeDOM = Array.from(document.querySelectorAll("[data-key]")).map((e) => {
    return e.getAttribute("data-key");
  });

  const newDOM = new Set(treeDOM);

  [...newDOM].map((e) => {
    let domnode = document.querySelectorAll(`[data-key='${e}']`);
    if (domnode.length > 1) {
      domnode[0].remove();
    }
  });
}

const ButtonsFilter = document.querySelectorAll("[data-option]");

ButtonsFilter.forEach((ButtonFilter) => {
  ButtonFilter.addEventListener("click", () => {
    const id = ButtonFilter.getAttribute("data-option");

    categoryActived = id

    document
      .querySelectorAll(`[data-option]`)
      .forEach((element) => element.classList.remove("actived"));

    ButtonFilter.classList.add("actived");

    if (id !== "all") {
      if (filterValues(insertedValues, id).length != 0) {
        filterValues(insertedValues, id).map((insertedValue) => {
          renderInDom(
            ".values",
            `
              <li class="value" tabindex="-1" data-category="${
                insertedValue.categoryID
              }" data-key="${insertedValue.id}">
                 <h4 class="font-3-medium color-grey-1">${Intl.NumberFormat(
                   "pt-br",
                   { style: "currency", currency: "BRL" }
                 ).format(insertedValue.value)}</h4>
                 <div class="flex-align-center gap-1">
                   <span class="value-category">${
                     valuesCategory[insertedValue.categoryID]
                   }</span>
                   <button class="bt bt-icon" onclick="removeValue(${
                     insertedValue.id
                   })" aria-label="Remover Valor">
                     <i class="fa-solid fa-trash"></i>
                   </button>
                 </div>
              </li>`,
            `[data-category='${id == 1 ? 0 : 1}']`
          );

          insertValueSumInDOM(insertedValuesfiltered);
        });
        analitycsContentValues();
      } else {
        renderInDom(".values", null, `[data-category='${id == 1 ? 0 : 1}']`);
        analitycsContentValues(
          `Sem nenhum valor na categoria ${valuesCategory[id]}`
        );
        insertValueSumInDOM(insertedValuesfiltered);
      }
    } else {
      insertedValues.map((insertedValue) => {
        renderInDom(
          ".values",
          `
          <li class="value" tabindex="-1" data-category="${
            insertedValue.categoryID
          }" data-key="${insertedValue.id}">
          <h4 class="font-3-medium color-grey-1">${Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(insertedValue.value)}</h4>
          <div class="flex-align-center gap-1">
            <span class="value-category">${
              valuesCategory[insertedValue.categoryID]
            }</span>
            <button class="bt bt-icon" onclick="removeValue(${
              insertedValue.id
            })" aria-label="Remover Valor">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </li>`
        );
      });
      analitycsContentValues("Nenhum valor cadastrado");
      insertValueSumInDOM(insertedValues);
    }
  });
});

insertValueSumInDOM(insertedValues);

function insertValueSumInDOM(arr) {
  document.querySelector(".sum .sum-value").textContent = Intl.NumberFormat(
    "pt-br",
    { style: "currency", currency: "BRL" }
  ).format(calcAllValuesForCategory(arr));
}

insertedValues.map((insertedValue) => {
  renderInDom(
    ".values",
    `
    <li class="value" tabindex="-1" data-category="${
      insertedValue.categoryID
    }" data-key="${insertedValue.id}">
      <h4 class="font-3-medium color-grey-1">${Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(insertedValue.value)}</h4>
      <div class="flex-align-center gap-1">
        <span class="value-category">${
          valuesCategory[insertedValue.categoryID]
        }</span>
        <button class="bt bt-icon" onclick="removeValue(${
          insertedValue.id
        })" aria-label="Remover Valor">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>`
  );
});

function insertValue() {
  const inputCreate = document.querySelector("input[name='value']");
  const buttonCreate = document.querySelector("button[id='createValue']");
  const valueType = document.querySelectorAll("input[name='valueType']");

  let categoryType = null;

  inputCreate.addEventListener("keyup", () => {
    let ValueWithoutString = inputCreate.value.replace(/[^0-9]/g, "");
    inputCreate.value = ValueWithoutString;
  });

  valueType.forEach((inputOption) => {
    inputOption.addEventListener("click", (e) => {
      document
        .querySelectorAll(`label[for]`)
        .forEach((e) => e.classList.remove("actived"));
      categoryType = inputOption.value;
      document
        .querySelector(`label[for='${inputOption.getAttribute("id")}']`)
        .classList.add("actived");
    });
  });

  buttonCreate.addEventListener("click", () => {
    if (inputCreate.value !== "" && categoryType != null) {
      insertedValues = [
        ...insertedValues,
        {
          id: insertedValues.length + 1,
          value: Number(inputCreate.value),
          categoryID: Number(categoryType),
        },
      ];

      inputCreate.value = "";

      const { value, id, categoryID } =
        insertedValues[insertedValues.length - 1];

      document
        .querySelector(
          "#create-new-value button[aria-controls='create-new-value']"
        )
        .click();

      document.querySelector("[data-option='all']").click();

      analitycsContentValues("Nenhum valor cadastrado");

      insertValueSumInDOM(insertedValues);

      renderInDom(
        ".values",
        `
            <li class="value" tabindex="-1" data-category="${categoryID}" data-key="${id}">
              <h4 class="font-3-medium color-grey-1">${Intl.NumberFormat(
                "pt-br",
                { style: "currency", currency: "BRL" }
              ).format(value)}</h4>
              <div class="flex-align-center gap-1">
                <span class="value-category">${
                  valuesCategory[categoryID]
                }</span>
                <button class="bt bt-icon" onclick="removeValue(${id})" aria-label="Remover Valor">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
        </li>`
      );
    }
  });
}

insertValue();

analitycsContentValues("Nenhum valor cadastrado");
