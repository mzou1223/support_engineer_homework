const csvOrganizationTable = require('./csvUtils/organizationCSV');
const csvAccountTable = require('./csvUtils/accountCSV');
const prompt = require('prompt-sync')();

let organizationTable;
let accountTable;

// const shopifyDomain = document.getElementById('myShopifyDomain');
// shopifyDomain.addEventListener('onClick', (e) => {
//     let result = [];
//     if (shopifyDomain === '' || shopifyDomain === null) {
//         result.push('Shopify Domain Required')
//     }
//     if (result.length > 0) {
//         e.preventDefault();
//         //need the backend query here to get the optimization settings with shopify domain as the entry
//     }
// })

// //Takes the value of an orgName and returns the organization record in JSON format.
// const generateRecordButton = document.getElementById('generateRecordButton');
// generateRecordButton.addEventListener('click', (e) => {
//     const orgName = document.getElementById('orgName').value
//     if (orgName === '') {
//         console.log('Organization Name Required');
//         return
//     }

// })

let testDomain = 'test-account-2.myshopify.com';
let testOrganizationRecord = 'Test Account 4'

// Question 1: Takes the value of a myShopifyDomain field as an input and returns their optimization settings.
function optimizationSettingFinder(myShopifyDomain) {
    let optimizationSettings;
    const standardizedDomain = myShopifyDomain.toLowerCase();
    organizationTable.forEach((row) => {
        if (row['myShopifyDomain'] === standardizedDomain) {
            optimizationSettings = JSON.parse(row['setup'])['optimization'];
            return optimizationSettings;
        }
    })
    return optimizationSettings
}

// Question 2 Loops through all organizations and shows the date they were created(DD / MM / YYYY), their status, and planName sorted by oldest to newest.
function sortOrganizationsFinder() {
    const sortedOrganizations = organizationTable.sort((a, b) => {
        //Sorted by Date
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);
        return dateA - dateB
    });

    let relevantOrganizationInformation = sortedOrganizations.map((organization) => {
        let matchedOrg;
        let id = organization['id'];
        let found = false;
        let name, date, status, planName
        accountTable.forEach((account) => {
            if (account['organizationId'] === id) {
                found = true;
                matchedOrg = account;
                name = organization['orgName'];
                date = new Date(organization['createdDate']);
                status = matchedOrg['status']
                planName = matchedOrg['planName'];
            }
        });
        //If you haven't found a single thing, return null for the status and planName:
        if (!found) {
            let name = organization['orgName'];
            let date = new Date(organization['createdDate'])
            let status = null;
            let planName = null;
            return [name, date, status, planName]
        }
        return [name, date, status, planName]
    });

    return relevantOrganizationInformation;
}

// Question 3 Returns the list of organizations whose status is cancelled.
function cancelledOrganizations() {
    const cancelledAccounts = accountTable.filter((account) => {
        return account['status'] === 'CANCELLED'
    }) //returns an array of accounts that are cancelled
    const namesOfOrganizations = cancelledAccounts.map((account) => {
        let cancelledId = account['organizationId'];
        for (let organization of organizationTable) {
            //Iterating through organizations
            if (organization['id'] === cancelledId) {
                return organization['orgName']
            }
        }
        return null;
    })
    return namesOfOrganizations;
}

// Question 4 Takes the value of an orgName and returns the organization record in JSON format.
function organizationRecord(orgName) {
    const organizationRecord = organizationTable.filter((org) => {
        return org['orgName'] === orgName
    });
    return JSON.stringify(organizationRecord)
}

//Main function runs all of the questions
async function main() {
    organizationTable = await csvOrganizationTable();
    accountTable = await csvAccountTable();
    // console.log(optimizationSettingFinder(testDomain))
    // console.log(sortOrganizationsFinder())
    // console.log(cancelledOrganizations())
    // console.log(organizationRecord(testOrganizationRecord))

    let playreport = true;
    while (playreport) {
        console.log('\n 1) Display optimization settings for a myShopifyDomain field. \n 2) Sort all organizations by oldest to newest and display creation date (DD/MM/YYYY), status, and plan name. \n 3) List all organizations whose status is cancelled. \n 4) Display organization record of orgName in JSON Format.')
        const javascriptReport = prompt('Choose a report to run: ');
        switch (javascriptReport) {
            case '1':
                const domain = prompt('Enter a Shopify Domain: ');
                console.log('Optimization Settings: ', optimizationSettingFinder(domain));
                break;
            case '2':
                console.log(sortOrganizationsFinder());
                break;
            case '3':
                console.log(cancelledOrganizations());
                break;
            case '4':
                const orgName = prompt('Enter an Organization Name: ');
                console.log('Organization Record: ', organizationRecord(orgName));
                break;
            default:
                console.log('Invalid choice. Please enter 1, 2, 3, or 4.');
                break;
        }
        const continueChoice = prompt('Do you want to run another report? (yes/no) ');
        if (continueChoice.toLowerCase() !== 'yes') {
            playreport = false;
        }
    }
}

main();



