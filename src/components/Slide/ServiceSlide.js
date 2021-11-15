import PrivateApiService from "../../api/privateApiService";

class ServiceSlide {
  static retrieveSynchronous() {
    //sy
    return new Promise((resolve, reject) => {
      PrivateApiService.retrieveSlides()
        .then((response) => {
          resolve(response.data.data);
        })
        .catch(() => {
          // handle error
          reject([]);
        });
    });
  }
  static getNum(val) {
    let num = val;
    if (isNaN(num) || num === "" || num === null || num === "null") {
      return 0;
    }
    return parseInt(num);
  }
  static async isIncludeAnOrder(anOrder) {
    try {
      const slides = await this.retrieveSynchronous();
      var orders = slides.map((slide) => this.getNum(slide.order));
      const setSlides = new Set(orders);
      let result = [...setSlides];
      return result.includes(anOrder);
    } catch (error) {
      return false;
    }
  }

  static async connectAPI(objectSlide, type) {
    if (await this.isIncludeAnOrder(objectSlide.order)) {
      return {
        type: "error",
        content: `Failure to ${type}, the order already exists, please try another order`,
      };
    }
    return { type: "success", content: `Success to ${type} a slide` };

    const action =
      type === "Add" ? ONGApiClient.createSlide : ONGApiClient.updateSlide;
    await action(objectSlide)
      .then((response) => {
        // handle success
        return { type: "success", content: `Success to ${type} a slide` };
      })
      .catch((error) => {
        // handle error
        return { type: "error", content: `Error on ${type} a slide` };
      });
    return { type: "error", content: `Error on slide, please try again` };
    // return({type:'success',content:`Success to ${type} an slide`})
  }
}
export { ServiceSlide };
