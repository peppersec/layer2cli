const inquirer = require('inquirer')
const fs = require('fs')
const AWS = require('aws-sdk')
AWS.config.loadFromPath('./aws_config.json');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();


async function main() {
    const answers = await inquirer
      .prompt([
        {
            type: 'input',
            message: 'Enter User Pool Name',
            name: 'pool_name'
        }
      ])
    const response = await createPool({name: answers.pool_name})
    console.log('Created pool Id: ', response.UserPool.Id)
}
main()

async function createPool({ name }) {
    return new Promise((resolve, reject) => {
        var params = {
            PoolName: name, /* required */
            AdminCreateUserConfig: {
              AllowAdminCreateUserOnly: true,
            },
            DeviceConfiguration: {
              ChallengeRequiredOnNewDevice: true,
              DeviceOnlyRememberedOnUserPrompt: true
            },
            Policies: {
              PasswordPolicy: {
                MinimumLength: 6,
                RequireLowercase: false,
                RequireNumbers: false,
                RequireSymbols: false,
                RequireUppercase: false
              }
            },
            Schema: [
              {
                AttributeDataType: 'String',
                DeveloperOnlyAttribute: false,
                Mutable: true,
                Name: 'account_eth',
                Required: false,
                StringAttributeConstraints: {
                  MaxLength: '42',
                  MinLength: '42'
                }
              },
              {
                AttributeDataType: 'String',
                DeveloperOnlyAttribute: false,
                Mutable: true,
                Name: 'email',
                Required: true
              },
              {
                AttributeDataType: 'String',
                DeveloperOnlyAttribute: false,
                Mutable: true,
                Name: 'phone_number',
                Required: true
              }
            ],
            AutoVerifiedAttributes: [
                'email'
                /* more items */
            ],
            // MfaConfiguration: 'ON'
            // SmsAuthenticationMessage: 'STRING_VALUE',
            // SmsConfiguration: {
            //   SnsCallerArn: 'STRING_VALUE', /* required */
            //   ExternalId: 'STRING_VALUE'
            // },
            // SmsVerificationMessage: 'STRING_VALUE',
            // UsernameAttributes: [
            //   'phone_number'
            //   /* more items */
            // ]
        };
        cognitoidentityserviceprovider.createUserPool(params, function(err, data) {
            if (err) {
                console.log(err); // an error occurred
                reject(err)
            } else {
                resolve(data)
            }   
        })
    })

}
