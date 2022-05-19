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
    const { width, height, result } = RLEDecipher(textResult);
    // Becase of the limit of JSXGraph board, for the moment
    if (width <= 41 && height <= 31) {
      send("selectPattern", { pattern: result });
    }
    destroyRLEImportListener();
  };
  reader.addEventListener("load", callback);
  reader.readAsText(file);
}

/**
 * RLE Decipher, rule description: https://conwaylife.com/wiki/Run_Length_Encoded
 * @param rawRLEtext the raw RLE text
 * @returns Object { width:number, height:number, result:CoordinatedPattern}
 */
function RLEDecipher(rawRLEtext: string): RLEDecipherResult {
  const lines = rawRLEtext.split("\n");
  console.log({ lines });
  let height = -1;
  let width = -1;
  let patternLineIndex: number;
  let rule: string;
  let result: CoordinatedPattern = [];
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

      const patternLines = lines
        .slice(patternLineIndex)
        .join("")
        .replace(/(\r\n|\n|\r)/gm, "");

      console.log(patternLines);

      result = [];

      const rleString = patternLines;
      const x = width;
      const y = height;

      //  Honer mark to
      //  https://github.com/timjacksonm/rle-decoder/blob/main/decode.js

      /**********************/
      /* rle-decoder starts */
      /**********************/

      //on number repeat next letter number of times.
      //End by splitting on $ creating multiple lines
      let decoded: mediumDecodedPattern = rleString
        .slice(0, -1)
        .replace(/(\d+)(\D)/g, function (match, num) {
          return match.split(num)[1].repeat(num);
        })
        .split("$");

      //replace letter 'o' with 1's & b with 0's ie - alive: 1 , dead: 0
      decoded = decoded.map((row) => row.replace(/o/g, 1));
      decoded = decoded.map((row) => row.replace(/b/g, 0));

      //for each row split into its own arrow containing single #'s
      decoded = decoded.map((row) => [...row.split("")]);

      //row length less than specifications add filler 0's
      decoded = decoded.map((row) => {
        if (row.length < x) {
          const filler = new Array(x - row.length).fill(0);
          const value = row.concat(filler);
          return value;
        } else {
          return row;
        }
      });

      //convert all string numbers to type of Number
      decoded = decoded.map((row) => row.map((string) => Number(string)));

      /**********************/
      /*  rle-decoder ends  */
      /**********************/

      if (decoded?.length === y) {
        let widthOffset = Math.floor((40 - x) / 2);
        let heightOffset = Math.floor((30 - y) / 2);
        widthOffset = widthOffset > 0 ? widthOffset : 0;
        heightOffset = heightOffset > 0 ? heightOffset : 0;
        for (let i = 0; i < y; i++) {
          for (let j = 0; j < x; j++) {
            if (decoded[i][j] === 1) {
              const tempcoord: [number, number] = [
                heightOffset + i,
                widthOffset + j,
              ];
              result.push(tempcoord);
            }
          }
        }
      }
    }
    break;
  }
  return { width, height, result };
}

export { registerRLEImportListenerAndThenDestroy, RLEDecipher };
