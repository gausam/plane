from .common import (
    ChangePasswordEndpoint,
    CSRFTokenEndpoint,
    ForgotPasswordEndpoint,
    ResetPasswordEndpoint,
    SetUserPasswordEndpoint,
    SignOutAuthEndpoint,
)
from .email import (
    SignInAuthEndpoint,
    SignUpAuthEndpoint,
)
from .github import (
    GitHubCallbackEndpoint,
    GitHubOauthInitiateEndpoint,
)
from .google import (
    GoogleCallbackEndpoint,
    GoogleOauthInitiateEndpoint,
)
from .magic import (
    MagicGenerateEndpoint,
    MagicSignInEndpoint,
)