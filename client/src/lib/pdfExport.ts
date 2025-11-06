import jsPDF from "jspdf";
import { checklistData } from "@shared/schema";
import type { User } from "@shared/schema";

export function exportChecklistToPDF(
  completedTasks: Set<string>,
  user: User | null
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  const addNewPageIfNeeded = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("CODED Data Science Bootcamp", margin, yPosition);
  yPosition += 10;

  doc.setFontSize(16);
  doc.text("Orientation Checklist", margin, yPosition);
  yPosition += 15;

  if (user) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const studentName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}`
      : user.email || "Student";
    doc.text(`Student: ${studentName}`, margin, yPosition);
    yPosition += lineHeight;
    if (user.email) {
      doc.text(`Email: ${user.email}`, margin, yPosition);
      yPosition += lineHeight;
    }
  }

  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    margin,
    yPosition
  );
  yPosition += lineHeight * 2;

  const totalTasks = checklistData.reduce(
    (sum, section) => sum + section.tasks.length,
    0
  );
  const completedCount = completedTasks.size;
  const percentage = Math.round((completedCount / totalTasks) * 100);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(
    `Progress: ${completedCount} of ${totalTasks} tasks (${percentage}%)`,
    margin,
    yPosition
  );
  yPosition += lineHeight * 2;

  checklistData.forEach((section) => {
    if (section.id === "welcome") {
      return;
    }

    addNewPageIfNeeded(30);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(section.title, margin, yPosition);
    yPosition += lineHeight;

    if (section.description) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      const descLines = doc.splitTextToSize(
        section.description,
        pageWidth - 2 * margin
      );
      descLines.forEach((line: string) => {
        addNewPageIfNeeded(lineHeight);
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    }

    yPosition += 3;

    section.tasks.forEach((task) => {
      addNewPageIfNeeded(lineHeight + 5);

      const isCompleted = completedTasks.has(task.id);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const checkbox = isCompleted ? "☑" : "☐";
      doc.text(checkbox, margin, yPosition);

      const taskText = task.title;
      const maxWidth = pageWidth - margin - 15;
      const textLines = doc.splitTextToSize(taskText, maxWidth);

      textLines.forEach((line: string, index: number) => {
        if (index > 0) addNewPageIfNeeded(lineHeight);
        doc.text(line, margin + 10, yPosition);
        yPosition += lineHeight;
      });

      if (task.isImportant) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(220, 38, 38);
        doc.text("[IMPORTANT]", margin + 10, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += lineHeight;
      }

      if (task.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        const descLines = doc.splitTextToSize(
          task.description,
          maxWidth
        );
        descLines.forEach((line: string) => {
          addNewPageIfNeeded(lineHeight);
          doc.text(line, margin + 10, yPosition);
          yPosition += lineHeight;
        });
        doc.setTextColor(0, 0, 0);
      }

      yPosition += 2;
    });

    yPosition += 5;
  });

  addNewPageIfNeeded(30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "CODED Human Capital Development Company © 2025",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );

  const fileName = `CODED-Orientation-Checklist-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
}
