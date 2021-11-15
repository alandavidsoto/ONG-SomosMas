import PrivateApiService from "../../../api/privateApiService";

class ServiceActivity {
  static async handleSubmitForm(objectActivity, type) {
    const action =
      type === "Add"
        ? PrivateApiService.createActivity
        : PrivateApiService.updateActivity;
    await action(objectActivity)
      .then((response) => {
        // handle success
        return { type: "success", content: `Success to ${type} an activity` };
      })
      .catch((error) => {
        // handle error
        return { type: "error", content: `Error on ${type} an activity` };
      });
    return { type: "error", content: `Error on activity, please try again` };
    // return({type:'success',content:`Success to ${type} an activity`})
  }
}
export { ServiceActivity };
