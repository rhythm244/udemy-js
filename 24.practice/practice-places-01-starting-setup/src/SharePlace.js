import { Modal } from './UI/Modal'
import { Map } from './UI/Map'

//Access DOM API
class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById("locate-btn");
        
        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this))
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this)) //ที่ต้อง bind this เพราะ ถ้าไม่ทำแล้ว เวลาเรียกใช้ this ใน findAddressHandler this มันจะ refer ไปที่ addEventListener
    }

    selectPlace(coordinates) {
      if(this.map){
        this.map.render(coordinates);
      } else {
        this.map = new Map(coordinates);
      }
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
          alert(
            "Location not avalible in your broswer please use more modren than this."
          );
          return;
        }
        const modal = new Modal('loading-modal-content', 'Loading location - please wait.')
        modal.show()
        
        navigator.geolocation.getCurrentPosition(
          (seccessResult) => {
            modal.hide();
            const coordinates = {
              lat: seccessResult.coords.latitude,
              lng: seccessResult.coords.longitude,
            };
            console.log(coordinates);
            this.selectPlace(coordinates)
          },
          (error) => {
            modal.hide();
            alert(
              "Cloud not find your location. Please enter your address manually"
            );
          }
        );
    }

    findAddressHandler(event) {
      event.preventDefault();
      const address = event.target.querySelector("input").value;
      if ( !address || address.trim().length === 0 ) {
        alert('Invalid input - please try again.')
        return;
      } 
      
      const modal = new Modal(
        "loading-modal-content",
        "Loading location - please wait."
      );
      modal.show();
    }
}

const placeFinder = new PlaceFinder();