function modalController(button, e){


      const modalId = button.getAttribute("aria-controls");
  
      const modal = document.getElementById(modalId);
  
      let stateModal = modal.classList.toggle("show");
  
      if (stateModal) {
        document
          .querySelectorAll(
            "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex='0'] button"
          )
          .forEach((e) => {
            e.toggleAttribute("disabled");
          });
        modal.querySelectorAll("*").forEach((element) => {
          element.removeAttribute("disabled");
        });
      } else {
        document.querySelectorAll("*").forEach((element) => {
          element.removeAttribute("disabled");
        });
      }
  
      if(modalId == "create-new-value"){
        document.querySelector("input[name='value'").focus()
      }
  
      document.querySelector("body").classList.toggle("modal-wrapper");
  
      document
        .querySelectorAll(`[aria-controls='${modalId}']`)
        .forEach((element) => {
          element.setAttribute("aria-expanded", stateModal);
        });
   
  }

