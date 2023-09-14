using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Web.UI;

namespace GRecaptchaV3Demo
{
    public partial class About : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                // Replace with your Secret Key
                string secretKey = "Your_Secret_Key";
                string responseToken = Request.Form["g-recaptcha-response"];

                bool valid = VerifyCaptcha(secretKey, responseToken);

                if (valid)
                {
                    // reCAPTCHA v3 passed, process the form
                    lblSuccess.Text = "Successful Validation of Recaptcha";
                    lblMessage.Text = "";
                }
                else
                {
                    // reCAPTCHA v3 failed
                    lblSuccess.Text = "";
                    lblMessage.Text = "Validation of Recaptcha Failed!";
                }
            }
        }

        private bool VerifyCaptcha(string secretKey, string responseToken)
        {
            using (var httpClient = new HttpClient())
            {
                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("secret", secretKey),
                    new KeyValuePair<string, string>("response", responseToken),
                });

                var response = httpClient.PostAsync("https://www.google.com/recaptcha/api/siteverify", content).Result;
                var result = response.Content.ReadAsStringAsync().Result;

                var serializer = new JavaScriptSerializer();
                var captchaResponse = serializer.Deserialize<CaptchaResponse>(result);

                return captchaResponse.Success;
            }
        }

        // Define a class to deserialize the reCAPTCHA response
        private class CaptchaResponse
        {
            public bool Success { get; set; }
        }
    }
}