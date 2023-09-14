<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="GRecaptchaV3Demo.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <main aria-labelledby="title">
        <h2 id="title">Sign Up</h2>

        <div class="container m-2 border-1 shadow-sm border-primary bg-light p-2">

            <form id="formSignup" action="" method="post">
                <input type="email" id="txtEmail" placeholder="Email Address" />
                <br />
                <br />
                <input type="password" id="txtPassword" placeholder="Password" />
                <br />
                <br />
                <input type="password" id="txtConfirmPassword" placeholder="Confirm Password" />
                <br />
                <br />
                <input type="text" id="txtName" placeholder="Full Name" />
                <br />
                <br />
                <button class="btn btn-primary shadow-sm" type="submit" id="btnSignup">Sign up</button>
                <asp:Label ID="lblSuccess" runat="server" ForeColor="Green"></asp:Label>
                <asp:Label ID="lblMessage" runat="server" ForeColor="Red"></asp:Label>

                <br />
                <p>reCAPTCHA Token (Valid for 2 minutes)</p>
                <%--<label id="lblValue" style="color: mediumorchid">---</label><br />--%>
                <input type="text" id="g-recaptcha-response" name="g-recaptcha-response" />
            </form>
        </div>

        <script>
            grecaptcha.enterprise.ready(async () => {
                const token = await grecaptcha.enterprise.execute('Your_Site_Key', { action: 'LOGIN' });
                // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
                // reCAPTCHA Enterprise to the end user's browser.
                // This token must be validated by creating an assessment.
                // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
                document.getElementById('g-recaptcha-response').value = token;
                console.log(token);
            });
        </script>
    </main>
</asp:Content>
