package utils

import (
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

const (
	TokenExpiration = 24 * time.Hour
	CookiePath      = "/"
	CookieDomain    = ""
	CookieSecure    = true
	CookieHTTPOnly  = true
)

// Load the secret from an environment variable
var SecretKey = func() string {
	secretKey, ok := os.LookupEnv("SECRET_KEY")
	if !ok {
		panic("SECRET_KEY environment variable not set")
	}
	return secretKey
}()

var signingMethod = jwt.SigningMethodHS256

type CookieConfig struct {
	Name     string
	Value    string
	MaxAge   int
	Path     string
	Domain   string
	Secure   bool
	HTTPOnly bool
}

func SetCookie(ctx *gin.Context, name, value string) {
	config := CookieConfig{
		Name:     name,
		Value:    value,
		MaxAge:   int(TokenExpiration.Seconds()),
		Path:     CookiePath,
		Domain:   CookieDomain,
		Secure:   CookieSecure,
		HTTPOnly: CookieHTTPOnly,
	}

	// Set SameSite attribute before setting cookie
	ctx.SetSameSite(http.SameSiteLaxMode)

	ctx.SetCookie(
		config.Name,
		config.Value,
		config.MaxAge,
		config.Path,
		config.Domain,
		config.Secure,
		config.HTTPOnly,
	)
}

func GenerateToken(email string, userID int64) (string, error) {
	now := time.Now()
	tokenExpirationTime := now.Add(TokenExpiration).Unix()
	claims := jwt.MapClaims{
		"userID": userID,
		"exp":    jwt.NewNumericDate(time.Unix(tokenExpirationTime, 0)),
		"iat":    jwt.NewNumericDate(now),
		"iss":    "Tasker",
		"sub":    "user-authentication",
	}

	token := jwt.NewWithClaims(signingMethod, claims)
	signedToken, err := token.SignedString([]byte(SecretKey))

	if err != nil {
		return "", err
	}

	return signedToken, nil
}

func VerifyToken(token string) (int64, error) {
	parsedToken, _ := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("unexpected signing token")
		}

		return []byte(SecretKey), nil
	})

	if parsedToken == nil {
		return 0, errors.New("parsed token is nil")
	}

	if !parsedToken.Valid {
		return 0, errors.New("token is not valid")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)

	if !ok {
		return 0, errors.New("could not parse claims")
	}

	userIdFloat64, ok := claims["userID"].(float64)
	if !ok {
		return 0, errors.New("userID is not a valid float64")
	}

	userId := int64(userIdFloat64)

	return userId, nil
}
