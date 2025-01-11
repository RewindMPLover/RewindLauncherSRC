$source = @"
using System;
using System.Runtime.InteropServices;

public class ProcessSuspender {
    [DllImport("ntdll.dll")]
    private static extern int NtSuspendProcess(IntPtr processHandle);
    
    public static void Suspend(int pid) {
        var process = System.Diagnostics.Process.GetProcessById(pid);
        if (process != null) {
            NtSuspendProcess(process.Handle);
        }
    }
}
"@

Add-Type -TypeDefinition $source
[ProcessSuspender]::Suspend($args[0])
