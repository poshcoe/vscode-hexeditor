import { ByteData } from "./byteData";

// Clears the data inspector of populated data
export function clearDataInspector(): void {
    // Thi function only gets called when these elements exist so these casts are safe
	(document.getElementById("binary8") as HTMLInputElement).value = "Invalid";
	for (let i = 0; i < 4; i++) {
		const numBits = (i + 1) * 8;
		(document.getElementById(`int${numBits}`) as HTMLInputElement).value = "Invalid";
		
		(document.getElementById(`uint${numBits}`) as HTMLInputElement).value = "Invalid";
	}
	(document.getElementById("int64") as HTMLInputElement).value = "Invalid";
	
	(document.getElementById("uint64") as HTMLInputElement).value = "Invalid";
}

// Given the byte_object representing the byte in the file populates the data inspector
export function populateDataInspector(byte_obj: ByteData, littleEndian: boolean): void {
	(document.getElementById("binary8") as HTMLInputElement).value = byte_obj.toBinary();
	for (let i = 0; i < 4; i++) {
		const numBits = (i + 1) * 8;
		const signed = byte_obj.byteConverter(numBits, true, littleEndian);
		const unsigned = byte_obj.byteConverter(numBits, false, littleEndian);
	
		(document.getElementById(`int${numBits}`) as HTMLInputElement).value = isNaN(Number(signed)) ? "End of File" : signed.toString();
		(document.getElementById(`uint${numBits}`) as HTMLInputElement).value = isNaN(Number(unsigned)) ? "End of File" : unsigned.toString();
	}
	const signed64 = byte_obj.byteConverter(64, true, littleEndian);
	const unsigned64 = byte_obj.byteConverter(64, false, littleEndian);
	(document.getElementById("int64") as HTMLInputElement).value = isNaN(Number(signed64)) ? "End of File" : signed64.toString();
	(document.getElementById("uint64") as HTMLInputElement).value = isNaN(Number(unsigned64)) ? "End of File" : unsigned64.toString();
}