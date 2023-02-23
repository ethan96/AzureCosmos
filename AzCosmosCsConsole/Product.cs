using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AzCosmosCsConsole
{
    public record Product(
        string id,
        string brand,
        string name,
        string desc,
        int price
    );
}
