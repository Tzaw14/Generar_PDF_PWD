async function generateReport() {
    const { jsPDF } = window.jspdf;
  
    // Obtener valores del formulario
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const project = document.getElementById("project").value.trim();
    const date = document.getElementById("date").value.trim();
    const userDescription = document.getElementById("description").value.trim();
  
    // Validación de campos
    if (!name || !email || !project || !date || !userDescription) {
      alert("Por favor, completá todos los campos antes de generar el informe.");
      return;
    }
  
    // Crear documento
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true
    });
  
    doc.setFont("times", "normal");
    doc.setFontSize(20);
    doc.text("Informe de Datos del Usuario", 105, 25, { align: "center" });
  
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);
  
    doc.setFontSize(12);
    let y = 40;
    const lh = 10;
  
    doc.text(`Nombre: ${name}`, 20, y);
    doc.text(`Correo Electrónico: ${email}`, 20, y += lh);
    doc.text(`Proyecto: ${project}`, 20, y += lh);
    doc.text(`Fecha: ${date}`, 20, y += lh);
  
    // Descripción escrita por el/la usuario/a
    doc.setFont("times", "italic");
    doc.text("Descripción del Usuario:", 20, y += lh * 2);
    const wrappedUserDesc = doc.splitTextToSize(userDescription, 170);
    doc.text(wrappedUserDesc, 20, y += lh);
  
    // Descripción fija institucional
    const fixedDescription = 
      "Este informe fue generado automáticamente a partir de los datos proporcionados en el formulario. " +
      "Puede ser utilizado como ficha de registro, informe preliminar o respaldo documental en proyectos académicos.";
  
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.text("Nota:", 20, y += lh * 2);
    doc.text(doc.splitTextToSize(fixedDescription, 170), 20, y += lh);
  
    // Mostrar PDF en la misma página y hacer scroll
    const pdfDataUri = doc.output("datauristring");
    const container = document.getElementById("reportContainer");
    container.innerHTML = `<iframe width="100%" height="500px" src="${pdfDataUri}"></iframe>`;
    container.scrollIntoView({ behavior: "smooth" });
  }
  