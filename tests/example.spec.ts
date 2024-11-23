import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www-qa2.cvs.com/');
  // await page.waitForTimeout(5000)
  await page.locator("(//*[text()='Schedule vaccinations'])[1]").click();
  await page.locator("#patientInfoFirstName").fill('Muthu')
  await page.locator("#patientInfoLastName").fill('Kumaran')
  await page.locator("#patientInfoEmail").fill('muthukumaran.ms@cvshealth.com')
  await page.locator("#ps_month").fill('01')
  await page.locator("#ps_day").fill('01')
  await page.locator("#ps_year").fill('1992')
  await page.locator("(//*[normalize-space()='Continue as a guest'])[2]").click({force: true});

    // Define the listener functions
    const requestListener = (request) => {
      const url = request.url();
      // if (url.includes('/v1/load')) {
          console.log('Request captured:', url);
      // }
    };
  
    const responseListener = async (response) => {
      const url = response.url();
      // if (url.includes('/v1/load')) {
          console.log('Response captured:', url);
      // }
    };
    // Attach the listeners
  // page.on('request', requestListener);
  // page.on('response', responseListener);
  
  // Emergency Branch
  page.on('request', async (request) => {
    const url = request.url();
    let jsonPOSTDATA; 
    if (url.includes('v1/load')){
      console.log('Request URL:', url);
      console.log('Request Method:', request.method());
      jsonPOSTDATA =  request.postData();
      console.log("postdata : "  + JSON.stringify(JSON.parse(jsonPOSTDATA)));
      if(JSON.stringify(JSON.parse(jsonPOSTDATA)).includes('"flow":"VACCINE"')){
        // console.log("evar : " + JSON.stringify(JSON.parse(jsonPOSTDATA).events[0].xdm._experience.analytics.customDimensions.eVars['eVar2'])  )
        console.log("evar : " + JSON.stringify(JSON.parse(jsonPOSTDATA).data.dob[0]))
      }
    }
    // console.log('Request captured:', url);
    // console.log("request.postData() : " + request.postData())
  
});


// Capture the response and link it to the corresponding request
page.on('response', async (response: any) => {
    const url = response.url();
    // console.log('Response captured:', url);
    // if(url.includes('bestsellers')){
    //   console.log("response.postData() : " + response.postData())
    // }
});


// await page.waitForTimeout(10000);

await page.locator("//*[contains(text(),'Hi Muthu')]").waitFor({state:"visible",timeout:20000});
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in')
  //   // await page.locator('#nav-hamburger-menu').click();
  //   await page.getByRole('link',{name: 'Best Sellers'}).click();
    // var getTitleTxt = await page.url();
    // console.log("getTitleTxt : " + getTitleTxt)
    // await expect(page.url()).toContainText("nav_em_cs_bestsellers_0_1_1_2");
    // await page.screenshot();
  // page.removeListener('request', requestListener);
  // page.removeListener('response', responseListener);

  



});

