export default async function noOfScreens() {

    const responseObj = {
        isSuppotred: false,
        screens: null
    }

    try {
        const screenDetails = await window.getScreenDetails()
        console.log(screenDetails)
        responseObj.isSuppotred = true;
        responseObj.screens = screenDetails.screens.length;
        return responseObj
    } catch (err) {
        console.log({err})
        return responseObj
    }
}