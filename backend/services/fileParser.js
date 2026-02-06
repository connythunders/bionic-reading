const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const officeParser = require('officeparser');

class FileParser {
  /**
   * Extraherar text från en fil (PDF eller DOCX)
   * @param {string} filePath - Sökväg till filen
   * @param {string} fileType - Filtyp ('pdf' eller 'docx')
   * @returns {Promise<{text: string, wordCount: number}>}
   */
  async parseFile(filePath, fileType) {
    try {
      let extractedText = '';

      if (fileType === 'pdf') {
        extractedText = await this.parsePDF(filePath);
      } else if (fileType === 'docx') {
        extractedText = await this.parseDOCX(filePath);
      } else if (fileType === 'pptx') {
        extractedText = await this.parsePPTX(filePath);
      } else {
        throw new Error(`Unsupported file type: ${fileType}`);
      }

      // Rensa och normalisera texten
      const cleanedText = this.cleanText(extractedText);
      const wordCount = this.countWords(cleanedText);

      return {
        text: cleanedText,
        wordCount: wordCount
      };
    } catch (error) {
      console.error('File parsing error:', error);
      throw new Error(`Kunde inte läsa filen: ${error.message}`);
    }
  }

  /**
   * Extraherar text från PDF-fil
   * @param {string} filePath
   * @returns {Promise<string>}
   */
  async parsePDF(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      throw new Error(`PDF-parsning misslyckades: ${error.message}`);
    }
  }

  /**
   * Extraherar text från DOCX-fil
   * @param {string} filePath
   * @returns {Promise<string>}
   */
  async parseDOCX(filePath) {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } catch (error) {
      throw new Error(`DOCX-parsning misslyckades: ${error.message}`);
    }
  }

  /**
   * Extraherar text från PPTX-fil
   * @param {string} filePath
   * @returns {Promise<string>}
   */
  async parsePPTX(filePath) {
    try {
      const data = await officeParser.parseOfficeAsync(filePath);
      return data;
    } catch (error) {
      throw new Error(`PPTX-parsning misslyckades: ${error.message}`);
    }
  }

  /**
   * Rensar och normaliserar text
   * @param {string} text
   * @returns {string}
   */
  cleanText(text) {
    return text
      // Ta bort extra whitespace
      .replace(/\s+/g, ' ')
      // Ta bort specialtecken som kan orsaka problem
      .replace(/[\x00-\x1F\x7F]/g, '')
      // Trimma
      .trim();
  }

  /**
   * Räknar ord i text
   * @param {string} text
   * @returns {number}
   */
  countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Validerar filtyp baserat på MIME-type
   * @param {string} mimetype
   * @returns {string|null} - Returnerar 'pdf' eller 'docx', eller null om ogiltig
   */
  validateFileType(mimetype) {
    const validTypes = {
      'application/pdf': 'pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
    };

    return validTypes[mimetype] || null;
  }

  /**
   * Validerar filstorlek
   * @param {number} sizeInBytes
   * @param {number} maxSizeMB - Max storlek i MB
   * @returns {boolean}
   */
  validateFileSize(sizeInBytes, maxSizeMB = 10) {
    const maxBytes = maxSizeMB * 1024 * 1024;
    return sizeInBytes <= maxBytes;
  }
}

module.exports = new FileParser();
