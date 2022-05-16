let listenerHolder: any = null;

/**
 *  Reads a RLE file and sends the pattern to the xstate machine.
 *  depends on: readText - RLEDecipher
 */
function registerRLEImportListenerAndThenDestroy(
  elementID = "#rle-file-upload",
  send: (action: string, payload: unknown) => void
): void {
  const fileSelector = document.querySelector<HTMLInputElement>(
    elementID
  ) as HTMLInputElement;
  const callback = (ev: Event) => {
    const fileList = (<HTMLInputElement>ev.target).files as FileList;
    console.log(fileList);
    for (const file of fileList) {
      readText(file, send);
    }
  };
  listenerHolder = callback;
  fileSelector.addEventListener("change", listenerHolder);
}

function destroyRLEImportListener(elementID = "#rle-file-upload"): void {
  const fileSelector = document.querySelector<HTMLInputElement>(
    elementID
  ) as HTMLInputElement;
  fileSelector?.removeEventListener("change", listenerHolder);
}

function readText(
  file: Blob,
  send: (action: string, payload: unknown) => void
): void {
  const reader = new FileReader();
  const callback = (): void => {
    console.log(reader.result);
    const textResult = String(reader.result);
    RLEDecipher(textResult);
    send("selectPattern", { pattern: reader.result });
    destroyRLEImportListener();
  };
  reader.addEventListener("load", callback);
  reader.readAsText(file);
}

/**
 * RLE Decipher, rule description: https://conwaylife.com/wiki/Run_Length_Encoded
 * @param rawRLEtext the raw RLE text
 */
function RLEDecipher(rawRLEtext: string) {
  const lines = rawRLEtext.split("\n");
  console.log({ lines });
  let height: number;
  let width: number;
  let patternLineIndex: number;
  let rule: string;
  for (const [index, line] of lines.entries()) {
    if (line.startsWith("#")) {
      continue;
    }
    if (line.startsWith("x")) {
      const metas = line.split(",");
      width = Number(metas[0].slice(metas[0].indexOf("=") + 1));
      height = Number(metas[1].slice(metas[1].indexOf("=") + 1));
      // b3/s23 for John Conway's Game of Life
      rule = String(metas[2]?.slice(metas[2].indexOf("=") + 1))
        .trim()
        .toLowerCase();
      rule === "b3/s23"
        ? console.log("Yes! b3/s23")
        : console.log("Oh not b3/s23");
      patternLineIndex = index + 1;

      const patternLines = lines.slice(patternLineIndex).join("");
      console.log(patternLines);
    }
    break;
  }
}

export { registerRLEImportListenerAndThenDestroy };
