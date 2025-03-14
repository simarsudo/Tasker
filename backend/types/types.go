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

type PriorityLevel string

const (
	High   PriorityLevel = "High"
	Medium PriorityLevel = "Medium"
	Low    PriorityLevel = "Low"
)

type TaskStatus string

const (
	NotStarted TaskStatus = "Not Started"
	InProgress TaskStatus = "In Progress"
	Completed  TaskStatus = "Completed"
	Blocked    TaskStatus = "Blocked"
)
