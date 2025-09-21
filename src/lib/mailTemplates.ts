import { Complaint } from "@/app/dashboard/page";

export const newComplainMailTemplate = (complaint: Complaint) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb;">
        <h2 style="color: #2563eb;">📢 New Complaint Submitted</h2>
        <p><strong>Title:</strong> ${complaint.title}</p>
        <p><strong>Category:</strong> ${complaint.category}</p>
        <p><strong>Priority:</strong> 
          <span style="color:${
            complaint.priority === "High"
              ? "red"
              : complaint.priority === "Medium"
              ? "orange"
              : "green"
          };">${complaint.priority}</span>
        </p>
        <p><strong>Description:</strong></p>
        <p style="background:#fff; padding:10px; border-radius:8px; border:1px solid #e5e7eb;">
          ${complaint.description}
        </p>
        <hr style="margin:20px 0;">
        <p style="font-size:12px; color:#6b7280;">This is an automated notification from Complaint Manager.</p>
      </div>
    `;

export const statusUpdateMailTemplate = (complaint: {
  title: string;
  status: string;
}) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb;">
    <h2 style="color: #16a34a;">✅ Complaint Status Updated</h2>
    <p><strong>Title:</strong> ${complaint.title}</p>
    <p><strong>New Status:</strong> 
      <span style="color:${
        complaint.status === "Resolved"
          ? "green"
          : complaint.status === "In Progress"
          ? "orange"
          : "gray"
      };">${complaint.status}</span>
    </p>
    <p><strong>Update Date:</strong> ${new Date().toLocaleString()}</p>
    <hr style="margin:20px 0;">
    <p style="font-size:12px; color:#6b7280;">This is an automated notification from Complaint Manager.</p>
  </div>
`;
