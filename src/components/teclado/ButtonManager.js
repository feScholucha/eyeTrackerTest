import ButtonFrame from './Components/ButtonFrame';


export default class ButtonManager {
    constructor() {
        this.buttonLibrary = [
            ["Del", -2],
            ["Voltar", -1],
            ["A", 1],
            ["B", 2],
            ["C", 3],
            ["D", 4],
            ["E", 5],
            ["F", 6],
            ["G", 7],
            ["H", 8],
            ["I", 9],
            ["J", 10],
            ["K", 11],
            ["L", 12],
            ["M", 13],
            ["N", 14],
            ["O", 15],
            ["P", 16],
            ["Q", 17],
            ["R", 18],
            ["S", 19],
            ["T", 20],
            ["U", 21],
            ["V", 22],
            ["W", 23],
            ["X", 24],
            ["Y", 25],
            ["Z", 26],
            ["Space", 27]
        ]
    }
    //Wip, ainda precisa automatizar, por enquanto está fixa com layout manual
    clusterize(context, layout,parentW, parentH, offsetX, offsetY, buttonW, buttonH) {
        let localCluster = [];
        let del =    new ButtonFrame(context, (1 * parentW / 6), offsetX, (1 * parentH / 2), offsetY, buttonW, buttonH, "Delete", -2);
        let voltar = new ButtonFrame(context, (3 * parentW / 6), offsetX, (1 * parentH / 2), offsetY, buttonW, buttonH, "Voltar", -1);
        let space =  new ButtonFrame(context, (5 * parentW / 6), offsetX, (1 * parentH / 2), offsetY, buttonW, buttonH, "Space", 27);

        
        switch (layout) {
            case 1: //Painel 2x3, Botões 2x(3+1)
                localCluster.push([
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "Q", 17),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "W", 23),
                    new ButtonFrame(context, (5 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "A", 1),
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (3 * parentH / 4), offsetY, buttonW, buttonH, "H", 8),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (3 * parentH / 4), offsetY, buttonW, buttonH, "O", 15),
                    del,
                    voltar,
                    space
                ]);
                localCluster.push([
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (1 * parentH/ 4), offsetY, buttonW, buttonH, "U", 21),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (1 * parentH/ 4), offsetY, buttonW, buttonH, "Z", 26),
                    new ButtonFrame(context, (5 * parentW / 6), offsetX, (1 * parentH/ 4), offsetY, buttonW, buttonH, "N", 14),
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (3 * parentH/ 4), offsetY, buttonW, buttonH, "J", 10),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (3 * parentH/ 4), offsetY, buttonW, buttonH, "X", 24),
                    new ButtonFrame(context, (5 * parentW / 6), offsetX, (3 * parentH/ 4), offsetY, buttonW, buttonH, "F", 6),
                    del,
                    voltar,
                    space
                ]);
                localCluster.push([
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "M", 13),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "I", 9),
                    new ButtonFrame(context, (5 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "D", 4),
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (3 * parentH / 4), offsetY, buttonW, buttonH, "K", 11),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (3 * parentH / 4), offsetY, buttonW, buttonH, "Y", 25),
                    new ButtonFrame(context, (5 * parentW / 6), offsetX, (3 * parentH / 4), offsetY, buttonW, buttonH, "V", 22),
                    del,
                    voltar,
                    space
                ]);
                localCluster.push([
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "R", 18),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "S", 19),
                    new ButtonFrame(context, (5 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "L", 12),
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (3 * parentH / 4), offsetY, buttonW, buttonH, "C", 3),
                    del,
                    voltar,
                    space
                ]);
                localCluster.push([
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "T", 20),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "P", 16),
                    new ButtonFrame(context, (5 * parentW / 6), offsetX, (1 * parentH / 4), offsetY, buttonW, buttonH, "G", 7),
                    new ButtonFrame(context, (1 * parentW / 6), offsetX, (3 * parentH / 4), offsetY, buttonW, buttonH, "E", 5),
                    new ButtonFrame(context, (3 * parentW / 6), offsetX, (3 * parentH / 4), offsetY, buttonW, buttonH, "B", 2),
                    del,
                    voltar,
                    space
                ]);
                break;

            default:
                break;
        }
        return localCluster;
    }
}