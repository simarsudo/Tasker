package types

type Role string

const (
	OwnerRole  Role = "owner"
	AdminRole  Role = "admin"
	MemberRole Role = "member"
)

type InvitationStatus string

const (
	PendingStatus  InvitationStatus = "pending"
	AcceptedStatus InvitationStatus = "accepted"
)
