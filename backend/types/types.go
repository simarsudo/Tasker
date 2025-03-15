package types

import (
	"fmt"
	"time"
)

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

// FormattedTime is a wrapper around time.Time that formats dates consistently
type FormattedTime time.Time

// MarshalJSON implements the json.Marshaler interface
func (ft FormattedTime) MarshalJSON() ([]byte, error) {
	t := time.Time(ft)
	formatted := fmt.Sprintf("\"%s\"", t.Format("01/02/2006")) // MM/DD/YYYY
	return []byte(formatted), nil
}
